// WorkGuide - Main Application Controller
import { i18n } from './i18n.js';
import { guidesData } from './data.js';

class WorkGuideApp {
  constructor() {
    // Application State
    this.currentLang = localStorage.getItem('workguide_lang') || 'vi';
    this.currentView = 'home'; // 'home' | 'all-guides' | 'detail' | 'step-guide' | 'completion'
    this.activeGuideId = guidesData[0]?.id || 'sop-erp-tablet-master';
    this.currentStepIndex = 0;
    this.searchQuery = '';
    this.activeCategory = 'all';
    this.activePlant = 'all';
    this.checkedSubSteps = new Set();
    this.guideStartTime = null;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.isDeviceFullWidth = false;
    this.activeGalleryImgIndex = 0;

    // Fullscreen Zoom & Pan Modal State
    this.modalState = {
      isOpen: false,
      scale: 1,
      posX: 0,
      posY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      showAnnotations: true,
      galleryImages: [],
      activeGalleryIndex: 0
    };

    // Audio synthesizer context (for industrial haptic sound simulation)
    this.audioCtx = null;

    // Text-To-Speech (TTS) Voice Assistant State
    this.isSpeaking = false;
    this.speakingElementId = null;
    this.currentUtterance = null;
    this.availableVoices = [];

    this.init();
    this.initTTS();
  }

  init() {
    this.bindGlobalEvents();
    this.render();
  }

  // Audio confirmation tone (zero external dependencies)
  playFeedbackTone(type = 'step') {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'step') {
        osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.12);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, this.audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, this.audioCtx.currentTime + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, this.audioCtx.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.45);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.45);
      }
    } catch (e) {
      // Audio not supported or blocked, silently skip
    }
  }

  // ==========================================================================
  // Text-To-Speech (TTS) Voice Assistant
  // ==========================================================================
  initTTS() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.availableVoices = window.speechSynthesis.getVoices();
      };
      this.availableVoices = window.speechSynthesis.getVoices();
    }
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.speakingElementId = null;
    this.updateSpeakingUI();
  }

  cleanTextForSpeech(text, lang = this.currentLang) {
    if (!text || typeof text !== 'string') return '';

    let s = text;

    // 1. Remove <img> tags and general HTML formatting tags without reading alt text
    s = s.replace(/<img[^>]*>/gi, ' ');
    s = s.replace(/<[^>]*>/g, ' ');
    s = s.replace(/&nbsp;/gi, ' ');
    s = s.replace(/&amp;/gi, lang === 'vi' ? ' và ' : ' 与 ');

    // 2. Remove all brackets and quotation marks that TTS engines pronounce aloud as "dấu ngoặc", "dấu nháy"
    s = s.replace(/[\[\]【】{}《》]/g, ' ');
    s = s.replace(/[“"”'‘'«»`]/g, ' ');

    // 3. Parentheses: replace with comma pause so it doesn't say "mở ngoặc đơn", "đóng ngoặc đơn"
    s = s.replace(/[\(\)（）]/g, ', ');

    // 4. Colons and semicolons: replace with comma pause so voice breathes naturally without saying "hai chấm", "chấm phẩy"
    s = s.replace(/[:：;；]/g, ', ');

    // 5. Relational and math symbols: convert to natural words
    if (lang === 'vi') {
      s = s.replace(/\s*->\s*|\s*→\s*|\s*=>\s*/g, ' sau đó đến ');
      s = s.replace(/\s*<\s*/g, ' nhỏ hơn ');
      s = s.replace(/\s*>\s*/g, ' lớn hơn ');
      s = s.replace(/\s*<=\s*|\s*≤\s*/g, ' nhỏ hơn hoặc bằng ');
      s = s.replace(/\s*>=\s*|\s*≥\s*/g, ' lớn hơn hoặc bằng ');
      s = s.replace(/\s*\/\s*/g, ' hoặc ');
      s = s.replace(/±\s*/g, ' cộng trừ ');
    } else {
      s = s.replace(/\s*->\s*|\s*→\s*|\s*=>\s*/g, ' 然后 ');
      s = s.replace(/\s*<\s*/g, ' 小于 ');
      s = s.replace(/\s*>\s*/g, ' 大于 ');
      s = s.replace(/\s*<=\s*|\s*≤\s*/g, ' 小于等于 ');
      s = s.replace(/\s*>=\s*|\s*≥\s*/g, ' 大于等于 ');
      s = s.replace(/\s*\/\s*/g, ' 或 ');
      s = s.replace(/±\s*/g, ' 正负 ');
    }

    // 6. Circled numbers (① ② ③ ...): pronounce as standard numbers
    const circledMap = {
      '①': '1. ', '②': '2. ', '③': '3. ', '④': '4. ', '⑤': '5. ',
      '⑥': '6. ', '⑦': '7. ', '⑧': '8. ', '⑨': '9. ', '⑩': '10. '
    };
    s = s.replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, m => circledMap[m] || ' ');

    // 7. Remove decorative symbols, warning icons, bullets
    s = s.replace(/[⚠✓✔✕✖•·●▪▲■◆★☆*#@~_^\\|]/g, ' ');

    // 8. Exclamation marks: replace with period
    s = s.replace(/[!！]+/g, '. ');
    s = s.replace(/\s*[-–—]\s*/g, ', ');

    // 9. Clean up multiple punctuation and whitespace
    s = s.replace(/,\s*,+/g, ',');
    s = s.replace(/\.\s*\.+/g, '.');
    s = s.replace(/\s+([,.\?!])/g, '$1');
    s = s.replace(/,\s*\./g, '.');
    s = s.replace(/[\n\r\t]+/g, ' ');
    s = s.replace(/\s{2,}/g, ' ');

    return s.trim();
  }

  speakText(text, elementId = null) {
    if (!('speechSynthesis' in window)) {
      alert(this.currentLang === 'vi' ? 'Trình duyệt của bạn không hỗ trợ tính năng phát âm thanh.' : '您的浏览器不支持语音播报功能。');
      return;
    }

    // Toggle off if currently speaking the exact same item
    if (this.isSpeaking && this.speakingElementId === elementId) {
      this.stopSpeaking();
      return;
    }

    this.stopSpeaking();

    if (!text || !text.trim()) return;

    // Sanitize text completely so TTS does NOT pronounce punctuation marks or symbols
    const cleanText = this.cleanTextForSpeech(text, this.currentLang);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const langCode = this.currentLang === 'vi' ? 'vi-VN' : 'zh-CN';
    utterance.lang = langCode;
    utterance.rate = 0.92; // Clear, comfortable speaking pace for noisy factory floors
    utterance.pitch = 1.0;

    // Pick best matching native voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(langCode.toLowerCase())) ||
                         voices.find(v => v.lang.toLowerCase().startsWith(langCode.substring(0, 2).toLowerCase()));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.speakingElementId = elementId;
      this.updateSpeakingUI();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.speakingElementId = null;
      this.updateSpeakingUI();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.speakingElementId = null;
      this.updateSpeakingUI();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  updateSpeakingUI() {
    document.querySelectorAll('.btn-speaker').forEach(btn => {
      const btnId = btn.getAttribute('data-speak-id');
      const labelSpan = btn.querySelector('.speaker-label');
      if (this.isSpeaking && btnId === this.speakingElementId) {
        btn.classList.add('is-speaking');
        if (labelSpan) labelSpan.textContent = this.t('stopAudio');
      } else {
        btn.classList.remove('is-speaking');
        if (labelSpan) labelSpan.textContent = this.t('listenAudio');
      }
    });
  }

  t(key, params = {}) {
    let text = i18n[this.currentLang][key] || key;
    for (const [pKey, pVal] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
    }
    return text;
  }

  setLanguage(lang) {
    if (lang !== 'vi' && lang !== 'zh') return;
    this.stopSpeaking();
    this.currentLang = lang;
    localStorage.setItem('workguide_lang', lang);
    this.render();
  }

  navigateTo(view, options = {}) {
    this.stopSpeaking();
    this.currentView = view;
    if (options.guideId) {
      this.activeGuideId = options.guideId;
    }
    if (options.stepIndex !== undefined) {
      this.currentStepIndex = options.stepIndex;
      this.activeGalleryImgIndex = 0;
    }

    if (view === 'step-guide') {
      if (!this.guideStartTime) {
        this.guideStartTime = Date.now();
        this.startTimer();
      }
    } else if (view === 'completion') {
      this.stopTimer();
      this.playFeedbackTone('success');
    }

    this.render();

    // Scroll container to top on view change
    const viewEl = document.querySelector('.view-content');
    if (viewEl) viewEl.scrollTop = 0;
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      if (this.guideStartTime) {
        this.elapsedSeconds = Math.floor((Date.now() - this.guideStartTime) / 1000);
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getActiveGuide() {
    return guidesData.find(g => g.id === this.activeGuideId) || guidesData[0];
  }

  bindGlobalEvents() {
    // Key bindings (Left/Right arrows for steps)
    window.addEventListener('keydown', (e) => {
      if (this.currentView === 'step-guide') {
        if (e.key === 'ArrowRight') {
          this.handleNextStep();
        } else if (e.key === 'ArrowLeft') {
          this.handlePrevStep();
        }
      }
      if (e.key === 'Escape' && this.modalState.isOpen) {
        this.closeImageModal();
      }
    });
  }

  handleNextStep() {
    const guide = this.getActiveGuide();
    if (this.currentStepIndex < guide.steps.length - 1) {
      this.currentStepIndex++;
      this.activeGalleryImgIndex = 0;
      this.playFeedbackTone('step');
      this.render();
      const viewEl = document.querySelector('.view-content');
      if (viewEl) viewEl.scrollTop = 0;
    } else {
      this.navigateTo('completion');
    }
  }

  handlePrevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.activeGalleryImgIndex = 0;
      this.render();
      const viewEl = document.querySelector('.view-content');
      if (viewEl) viewEl.scrollTop = 0;
    }
  }

  toggleSubStepCheck(key) {
    if (this.checkedSubSteps.has(key)) {
      this.checkedSubSteps.delete(key);
    } else {
      this.checkedSubSteps.add(key);
      this.playFeedbackTone('step');
    }
    this.render();
  }

  openImageModal(imgSrc, annotations = [], galleryImages = [], activeGalleryIndex = 0) {
    this.modalState = {
      isOpen: true,
      scale: 1,
      posX: 0,
      posY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      imgSrc,
      annotations,
      showAnnotations: true,
      galleryImages: galleryImages || [],
      activeGalleryIndex: activeGalleryIndex || 0
    };
    this.renderModal();
  }

  closeImageModal() {
    this.modalState.isOpen = false;
    this.renderModal();
  }

  // ==========================================================================
  // Render Pipeline
  // ==========================================================================
  render() {
    const root = document.getElementById('app-root');
    if (!root) return;

    const guide = this.getActiveGuide();

    root.innerHTML = `
      <!-- Desktop Bezel Controls -->
      <div class="desktop-controls">
        <button class="desktop-btn" id="toggle-frame-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          <span>${this.isDeviceFullWidth ? this.t('deviceModeMobile') : this.t('deviceModeFull')}</span>
        </button>
      </div>

      <!-- Smartphone Bezel Simulation Container (390px x 844px) -->
      <div class="device-wrapper ${this.isDeviceFullWidth ? 'full-screen-mode' : ''}">
        <div class="device-notch">
          <div class="speaker"></div>
          <div class="camera"></div>
        </div>

        <div class="app-container">
          <!-- Top App Header -->
          ${this.renderHeader(guide)}

          <!-- Main Scrollable Content Viewport -->
          <main class="view-content">
            ${this.renderCurrentView(guide)}
          </main>

          <!-- Fixed Action Bar (For Step Guide Screen & Detail Screen) -->
          ${this.currentView === 'step-guide' ? this.renderStepActionBar(guide) : ''}
          ${this.currentView === 'detail' ? this.renderDetailActionBar(guide) : ''}

          <!-- Bottom Navigation (Only visible on main browsing screens) -->
          ${(this.currentView === 'home' || this.currentView === 'all-guides') ? this.renderBottomNav() : ''}
        </div>
      </div>

      <!-- Fullscreen Zoom & Pan Modal -->
      <div id="image-modal-root"></div>
    `;

    this.attachEventListeners();
    this.renderModal();
  }

  renderHeader(guide) {
    const isStep = this.currentView === 'step-guide';
    const isDetail = this.currentView === 'detail';
    const isCompletion = this.currentView === 'completion';
    const isSopDoc = this.currentView === 'sop-doc';

    let leftSection = '';
    let centerSection = '';

    if (isStep) {
      leftSection = `
        <button class="header-btn" id="header-back-btn" title="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      `;
      centerSection = `
        <div class="step-header-indicator">
          ${this.t('stepIndex', { current: this.currentStepIndex + 1, total: guide.steps.length })}
        </div>
      `;
    } else if (isDetail) {
      leftSection = `
        <button class="header-btn" id="header-back-btn" title="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      `;
      centerSection = `
        <span style="font-weight: 700; font-size: 14px; color: var(--color-primary);">
          ${guide.sopNumber}
        </span>
      `;
    } else if (isSopDoc) {
      leftSection = `
        <button class="header-btn" id="header-back-btn" title="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      `;
      centerSection = `
        <span style="font-weight: 700; font-size: 13px; color: var(--color-primary);">
          ${this.t('officialDocTitle')}
        </span>
      `;
    } else {
      leftSection = `
        <div class="app-brand">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">${this.t('appName')}</span>
            <span class="brand-sub">${this.t('industrialMode')}</span>
          </div>
        </div>
      `;
    }

    return `
      <header class="app-header">
        <div class="header-left">
          ${leftSection}
        </div>

        <div class="header-center">
          ${centerSection}
        </div>

        <div class="header-right">
          <div class="lang-switcher">
            <button class="lang-btn ${this.currentLang === 'vi' ? 'active' : ''}" data-lang="vi">VI</button>
            <button class="lang-btn ${this.currentLang === 'zh' ? 'active' : ''}" data-lang="zh">中文</button>
          </div>
        </div>
      </header>
    `;
  }

  renderCurrentView(guide) {
    switch (this.currentView) {
      case 'home':
        return this.renderHomeView();
      case 'all-guides':
        return this.renderAllGuidesView();
      case 'detail':
        return this.renderDetailView(guide);
      case 'step-guide':
        return this.renderStepGuideView(guide);
      case 'sop-doc':
        return this.renderSopDocView(guide);
      case 'completion':
        return this.renderCompletionView(guide);
      default:
        return this.renderHomeView();
    }
  }

  renderHomeView() {
    const allCategoriesList = [
      { id: 'all', labelKey: 'allCategories', icon: 'grid' },
      { id: 'catERP', labelKey: 'catERP', icon: 'tablet' }
    ];
    const existingCats = new Set(guidesData.map(g => g.category));
    const categories = allCategoriesList.filter(c => c.id === 'all' || existingCats.has(c.id));

    // Filter guides
    const filteredGuides = guidesData.filter(g => {
      const matchesCat = this.activeCategory === 'all' || g.category === this.activeCategory;
      const q = this.searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        g.title.vi.toLowerCase().includes(q) ||
        g.title.zh.toLowerCase().includes(q) ||
        g.subtitle.vi.toLowerCase().includes(q) ||
        g.subtitle.zh.toLowerCase().includes(q) ||
        g.sopNumber.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });

    const recentGuide = guidesData[0]; // Featured SOP (Chen Kai ERP Tablet)

    return `
      <!-- Large Search Bar -->
      <div class="search-container">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            class="search-input" 
            id="home-search-input"
            placeholder="${this.t('searchPlaceholder')}" 
            value="${this.searchQuery}"
          />
          ${this.searchQuery ? `
            <button class="search-clear-btn" id="search-clear-btn">✕</button>
          ` : ''}
        </div>
      </div>

      <!-- Horizontal Category Filter Chips -->
      <div class="category-chips">
        ${categories.map(cat => `
          <button 
            class="chip-btn ${this.activeCategory === cat.id ? 'active' : ''}" 
            data-category="${cat.id}"
          >
            <span>${this.t(cat.labelKey)}</span>
          </button>
        `).join('')}
      </div>

      <!-- Featured / Active SOP Highlight Hero Card -->
      ${this.activeCategory === 'all' && !this.searchQuery ? `
        <div class="section-header">
          <div class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${this.t('recentGuides')}</span>
          </div>
          <span class="section-badge">CHEN KAI SOP</span>
        </div>

        <div class="recent-hero-card" data-guide-id="${recentGuide.id}">
          <div class="recent-hero-header">
            <div class="recent-hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${this.t('recentGuides')}</span>
            </div>
            <span class="recent-hero-tag">${recentGuide.sopNumber}</span>
          </div>

          <div class="recent-hero-body">
            <div class="recent-hero-img-box">
              <img src="${recentGuide.coverImage}" class="recent-hero-img" alt="${recentGuide.title[this.currentLang]}" />
            </div>
            <div class="recent-hero-details">
              <h3 class="recent-hero-title">${recentGuide.title[this.currentLang]}</h3>
              <p class="recent-hero-sub">${recentGuide.company[this.currentLang]}</p>
            </div>
          </div>

          <div class="recent-hero-footer">
            <div class="recent-hero-meta">
              <span>${this.t('stepsCount', { count: recentGuide.steps.length })}</span>
              <span>•</span>
              <span>${this.t('durationEst', { min: recentGuide.durationMinutes })}</span>
            </div>
            <div class="recent-hero-cta">
              <span>${this.t('startGuideBtn')}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- All Guides List Header -->
      <div class="section-header">
        <div class="section-title">
          <span>${this.t('allGuidesTitle')}</span>
          <span class="section-badge">${filteredGuides.length}</span>
        </div>
      </div>

      <!-- Guides List -->
      <div class="guides-list">
        ${filteredGuides.length > 0 ? filteredGuides.map(guide => `
          <div class="guide-card" data-guide-id="${guide.id}">
            <div class="guide-thumb-wrapper">
              <img src="${guide.coverImage}" class="guide-thumb" alt="${guide.title[this.currentLang]}" />
            </div>
            <div class="guide-card-content">
              <div class="guide-card-header">
                <span class="guide-sop-tag">${guide.sopNumber}</span>
                <h3 class="guide-card-title">${guide.title[this.currentLang]}</h3>
              </div>
              <div class="plant-badge">${guide.company[this.currentLang]}</div>
              <div class="guide-card-meta">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>${this.t('stepsCount', { count: guide.steps.length })}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>${this.t('durationEst', { min: guide.durationMinutes })}</span>
                </div>
              </div>
            </div>
          </div>
        `).join('') : `
          <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h4 class="empty-title">${this.t('noResults')}</h4>
            <p class="empty-desc">${this.t('noResultsSub')}</p>
          </div>
        `}
      </div>
    `;
  }

  renderAllGuidesView() {
    const categories = [
      { id: 'all', labelKey: 'allCategories', icon: 'grid' },
      { id: 'catERP', labelKey: 'catERP', icon: 'tablet' }
    ];

    const filteredGuides = guidesData.filter(g => {
      const matchesCat = this.activeCategory === 'all' || g.category === this.activeCategory;
      const q = this.searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        g.title.vi.toLowerCase().includes(q) ||
        g.title.zh.toLowerCase().includes(q) ||
        g.subtitle.vi.toLowerCase().includes(q) ||
        g.subtitle.zh.toLowerCase().includes(q) ||
        g.sopNumber.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });

    return `
      <!-- Large Search Bar -->
      <div class="search-container">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            class="search-input" 
            id="home-search-input"
            placeholder="${this.t('searchPlaceholder')}" 
            value="${this.searchQuery}"
          />
          ${this.searchQuery ? `
            <button class="search-clear-btn" id="search-clear-btn">✕</button>
          ` : ''}
        </div>
      </div>

      <!-- Horizontal Category Filter Chips -->
      <div class="category-chips">
        ${categories.map(cat => `
          <button 
            class="chip-btn ${this.activeCategory === cat.id ? 'active' : ''}" 
            data-category="${cat.id}"
          >
            <span>${this.t(cat.labelKey)}</span>
          </button>
        `).join('')}
      </div>

      <!-- Full Catalog Header -->
      <div class="section-header">
        <div class="section-title">
          <span>${this.t('allGuidesTitle')}</span>
          <span class="section-badge">${filteredGuides.length}</span>
        </div>
      </div>

      <!-- Guides List -->
      <div class="guides-list">
        ${filteredGuides.length > 0 ? filteredGuides.map(guide => `
          <div class="guide-card" data-guide-id="${guide.id}">
            <div class="guide-thumb-wrapper">
              <img src="${guide.coverImage}" class="guide-thumb" alt="${guide.title[this.currentLang]}" />
            </div>
            <div class="guide-card-content">
              <div class="guide-card-header">
                <span class="guide-sop-tag">${guide.sopNumber}</span>
                <h3 class="guide-card-title">${guide.title[this.currentLang]}</h3>
              </div>
              <div class="plant-badge">${guide.company[this.currentLang]}</div>
              <div class="guide-card-meta">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>${this.t('stepsCount', { count: guide.steps.length })}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>${this.t('durationEst', { min: guide.durationMinutes })}</span>
                </div>
              </div>
            </div>
          </div>
        `).join('') : `
          <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h4 class="empty-title">${this.t('noResults')}</h4>
            <p class="empty-desc">${this.t('noResultsSub')}</p>
          </div>
        `}
      </div>
    `;
  }

  renderDetailView(guide) {
    return `
      <!-- Cover Card with Badge -->
      <div class="detail-cover-card">
        <div class="detail-cover-image-box">
          <img src="${guide.coverImage}" class="detail-cover-img" alt="${guide.title[this.currentLang]}" />
          <div class="detail-sop-chip">${guide.sopNumber} · ${guide.revision}</div>
        </div>
        <div class="detail-body">
          <div class="plant-badge">${guide.company[this.currentLang]}</div>
          <h2 class="detail-title">${guide.title[this.currentLang]}</h2>
          <p class="detail-subtitle">${guide.subtitle[this.currentLang]}</p>

          <!-- Voice Audio Overview Button -->
          <div class="detail-voice-bar">
            <button class="speaker-pill-btn btn-speaker" data-speak-id="detail-overview" id="btn-speak-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span class="speaker-label">${this.t('listenOverview')}</span>
              <span class="sound-wave-anim"><i></i><i></i><i></i></span>
            </button>
          </div>

          <div class="detail-meta-pills">
            <div class="meta-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>${this.t('stepsCount', { count: guide.steps.length })}</span>
            </div>
            <div class="meta-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${this.t('durationEst', { min: guide.durationMinutes })}</span>
            </div>
            <div class="meta-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${this.t(guide.difficulty)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Official SOP Document Specification Metadata -->
      ${guide.author ? `
        <div class="sop-meta-card">
          <div class="sop-meta-header">
            <span class="sop-meta-title-badge">${this.t('sopStandardTitle')}</span>
            <span class="sop-meta-version-badge">${guide.sopNumber}</span>
          </div>
          <div class="sop-meta-grid">
            <div class="sop-meta-box">
              <span class="sop-meta-label">${this.t('authorLabel')}</span>
              <span class="sop-meta-val">${guide.author}</span>
            </div>
            <div class="sop-meta-box">
              <span class="sop-meta-label">${this.t('tabletVersionLabel')}</span>
              <span class="sop-meta-val">${guide.tabletVersion || '1.5.48'}</span>
            </div>
            <div class="sop-meta-box">
              <span class="sop-meta-label">${this.t('issueDateLabel')}</span>
              <span class="sop-meta-val">${guide.issueDate || '2026-4-20'}</span>
            </div>
            <div class="sop-meta-box">
              <span class="sop-meta-label">${this.t('approvalDateLabel')}</span>
              <span class="sop-meta-val">${guide.approvalDate || '2026-05-01'}</span>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Equipment & Tools Preparation -->
      <div class="info-section-card">
        <h4 class="info-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
          <span>${this.t('equipmentReq')}</span>
        </h4>
        <div class="tools-grid">
          ${guide.tools.map(tool => `
            <div class="tool-item">
              <img src="${tool.image}" class="tool-img" alt="${tool.name[this.currentLang]}" />
              <span class="tool-name">${tool.name[this.currentLang]}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Safety & Prerequisites Alert with Speaker -->
      <div class="prereq-alert">
        <svg class="prereq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <div class="prereq-text">
          <strong>${this.t('safetyPrereq')}:</strong> ${guide.prerequisites[this.currentLang]}
        </div>
        <button class="btn-speaker-item btn-speaker warning-speaker" data-speak-id="detail-prereq" data-speak-text="${encodeURIComponent(guide.prerequisites[this.currentLang])}" title="${this.t('listenPrereq')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>
      </div>

      <!-- Official SOP Document View Banner -->
      <div class="detail-sop-doc-banner" id="view-sop-doc-banner">
        <div class="detail-sop-doc-banner-info">
          <span class="detail-sop-doc-banner-title">${this.t('viewOfficialSopDoc')}</span>
          <span class="detail-sop-doc-banner-sub">${this.currentLang === 'vi' ? 'Xem toàn văn biểu mẫu SOP 2 trang chuẩn Chen Kai có đầy đủ bảng biểu & hình ảnh gốc' : '查看符合振凯规范的标准双页SOP原版表格文档（含全部图示与说明）'}</span>
        </div>
        <div class="detail-sop-doc-banner-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
      </div>

      <!-- Step Overview Timeline -->
      <div class="info-section-card">
        <h4 class="info-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <span>${this.t('stepOverview')} (${guide.steps.length} ${this.currentLang === 'vi' ? 'thao tác chi tiết' : '详细操作'})</span>
        </h4>
        <div class="step-timeline">
          ${guide.steps.map((s, idx) => `
            <div class="timeline-item" data-step-index="${idx}">
              <div class="timeline-num">${s.stepNumber}</div>
              <div class="timeline-title">${s.name[this.currentLang]}</div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderDetailActionBar(guide) {
    return `
      <div class="step-action-bar" style="display: flex; gap: 10px;">
        <button class="btn-primary-full" id="start-guide-btn" style="flex: 1.3;">
          <span>${this.t('startGuideBtn')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        <button class="btn-secondary-full" id="view-sop-doc-btn" style="flex: 0.9; background: var(--color-surface); border: 1.5px solid var(--color-primary); color: var(--color-primary); font-weight: 700; border-radius: var(--radius-xl); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 12px; font-size: 13px;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span>${this.currentLang === 'vi' ? 'Xem Bản SOP' : '查看原版'}</span>
        </button>
      </div>
    `;
  }

  renderStepGuideView(guide) {
    const step = guide.steps[this.currentStepIndex];
    const totalSteps = guide.steps.length;
    const progressPercent = ((this.currentStepIndex + 1) / totalSteps) * 100;

    const hasMultipleImages = step.images && step.images.length > 1;
    if (this.activeGalleryImgIndex >= (step.images ? step.images.length : 0)) {
      this.activeGalleryImgIndex = 0;
    }
    const currentImgObj = hasMultipleImages ? step.images[this.activeGalleryImgIndex] : { src: step.image, label: step.name };
    const activeImgSrc = currentImgObj.src;
    const activeImgLabel = currentImgObj.label ? currentImgObj.label[this.currentLang] : step.name[this.currentLang];

    return `
      <div class="step-guide-container">
        <!-- Segmented Continuous Progress Bar -->
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Step Header Title with Speaker Button -->
        <div class="step-header-box">
          <div class="step-header-top">
            <span class="step-label-tag">
              ${this.t('stepOf', { current: step.stepNumber, total: totalSteps })}${step.docxStepRef ? ` · Docx 步骤 ${step.docxStepRef}` : ''}
            </span>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="header-doc-link-btn" id="step-open-doc-btn" title="${this.t('viewOfficialSopDoc')}" style="padding: 4px 10px; height: 32px; font-size: 11px; font-weight: 700; border-radius: var(--radius-full); background: var(--color-bg-page); border: 1px solid var(--color-border); color: var(--color-primary); cursor: pointer; display: flex; align-items: center; gap: 4px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span>${this.currentLang === 'vi' ? 'Bản Docx' : '原版'}</span>
              </button>
              <button class="btn-speaker-header btn-speaker" data-speak-id="step-full" id="btn-speak-step-full" title="${this.t('listenStep')}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span class="speaker-label">${this.t('listenAudio')}</span>
                <span class="sound-wave-anim"><i></i><i></i><i></i></span>
              </button>
            </div>
          </div>
          <h2 class="step-main-title">${step.name[this.currentLang]}</h2>
        </div>

        <!-- Instructional Visual Card with Annotations & Gallery -->
        <div class="step-gallery-wrapper">
          ${hasMultipleImages ? `
            <div class="gallery-tabs-scroll">
              ${step.images.map((imgItem, idx) => `
                <button class="gallery-tab-btn ${this.activeGalleryImgIndex === idx ? 'active' : ''}" data-gallery-index="${idx}">
                  <span class="gallery-tab-badge">${idx + 1}</span>
                  <img src="${imgItem.src}" class="gallery-tab-thumb" alt="thumb ${idx + 1}" />
                  <span>${imgItem.label[this.currentLang]}</span>
                </button>
              `).join('')}
            </div>
          ` : ''}

          <div class="step-visual-card" id="step-image-card" data-img-src="${activeImgSrc}">
            <div class="step-visual-viewport">
              <img src="${activeImgSrc}" class="step-image" alt="${activeImgLabel}" />
              
              ${hasMultipleImages ? `
                <div class="gallery-counter-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span>${this.activeGalleryImgIndex + 1} / ${step.images.length}</span>
                </div>

                <div class="gallery-nav-arrows">
                  <button class="gallery-arrow-btn" id="gallery-prev-arrow" title="${this.t('galleryPrevImage')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button class="gallery-arrow-btn" id="gallery-next-arrow" title="${this.t('galleryNextImage')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              ` : ''}

              <!-- Annotations Layer (Only if extra overlay annotations exist) -->
              ${(step.annotations && step.annotations.length > 0) ? `
                <div class="annotations-layer">
                  ${step.annotations.map(ann => {
                    if (ann.type === 'box') {
                      return `
                        <div class="annotation-box" style="
                          left: ${ann.x}%; 
                          top: ${ann.y}%; 
                          width: ${ann.width}%; 
                          height: ${ann.height}%;
                        "></div>
                      `;
                    } else if (ann.type === 'badge') {
                      return `
                        <div class="annotation-badge" style="left: ${ann.x}%; top: ${ann.y}%;">
                          ${ann.number || 1}
                        </div>
                      `;
                    } else if (ann.type === 'arrow') {
                      return `
                        <div class="annotation-arrow" style="left: ${ann.x}%; top: ${ann.y}%;">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L4 12h5v8h6v-8h5L12 2z"/>
                          </svg>
                        </div>
                      `;
                    }
                    return '';
                  }).join('')}
                </div>
              ` : ''}

              <!-- Tap to Zoom Badge -->
              <div class="zoom-hint-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <span>${this.t('tapToZoom')}</span>
              </div>
            </div>
          </div>

          ${hasMultipleImages ? `
            <div class="gallery-active-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>${activeImgLabel}</span>
            </div>
          ` : ''}
        </div>

        <!-- Short Visual Numbered Instructions Checklist with Individual Speaker Buttons -->
        <div class="instructions-card">
          ${step.instructions[this.currentLang].map((inst, i) => {
            const checkKey = `${guide.id}-${this.currentStepIndex}-${i}`;
            const isChecked = this.checkedSubSteps.has(checkKey);
            return `
              <div class="instruction-step-item ${isChecked ? 'checked' : ''}">
                <div class="instruction-check-area" data-substep-key="${checkKey}">
                  <div class="instruction-num-circle">
                    ${isChecked ? '✓' : (i + 1)}
                  </div>
                  <div class="instruction-text">${inst}</div>
                </div>
                <button 
                  class="btn-speaker-item btn-speaker" 
                  data-speak-id="step-item-${i}" 
                  data-speak-text="${encodeURIComponent(inst)}"
                  title="${this.t('listenItem')}"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Warning / Notice Alert Section with Speaker -->
        ${step.warning ? `
          <div class="warning-card">
            <div class="warning-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div class="warning-content">
              <div class="warning-header-row">
                <div class="warning-heading">${this.t('warningTitle')}</div>
                <button class="btn-speaker-item btn-speaker warning-speaker" data-speak-id="step-warning" data-speak-text="${encodeURIComponent(step.warning[this.currentLang])}" title="${this.t('listenAudio')}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </button>
              </div>
              <div class="warning-desc">${step.warning[this.currentLang]}</div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderStepActionBar(guide) {
    const isFirstStep = this.currentStepIndex === 0;
    const isLastStep = this.currentStepIndex === guide.steps.length - 1;

    return `
      <div class="step-action-bar">
        <button 
          class="btn-secondary" 
          id="btn-prev-step"
          ${isFirstStep ? 'disabled' : ''}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>${this.t('prevStep')}</span>
        </button>

        <button 
          class="btn-primary ${isLastStep ? 'btn-finish' : ''}" 
          id="btn-next-step"
        >
          <span>${isLastStep ? this.t('finishGuide') : this.t('nextStep')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            ${isLastStep ? `
              <polyline points="20 6 9 17 4 12"></polyline>
            ` : `
              <polyline points="9 18 15 12 9 6"></polyline>
            `}
          </svg>
        </button>
      </div>
    `;
  }

  renderCompletionView(guide) {
    const minutes = Math.max(1, Math.round(this.elapsedSeconds / 60));

    return `
      <div class="completion-container">
        <!-- Success Animated Badge -->
        <div class="success-badge-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <h2 class="completion-heading">${this.t('completedTitle')}</h2>
          <p class="completion-sub">${this.t('completedSubtitle')}</p>
        </div>

        <!-- Summary Statistics Card -->
        <div class="completion-stats-card">
          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-value">${guide.steps.length}/${guide.steps.length}</span>
              <span class="stat-label">${this.t('completedStepsCount')}</span>
            </div>
            <div class="stat-item" style="border-left: 1px solid var(--color-border); border-right: 1px solid var(--color-border); padding: 0 16px;">
              <span class="stat-value">${minutes} min</span>
              <span class="stat-label">${this.t('timeSpent')}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value" style="color: var(--color-success);">100%</span>
              <span class="stat-label">SOP OK</span>
            </div>
          </div>

          <div class="cert-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>${this.t('sopCertified')}</span>
          </div>
        </div>

        <!-- Primary Action Button -->
        <div style="width: 100%; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding-bottom: 28px;">
          <button class="btn-primary-full" id="btn-back-home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>${this.t('backToHome')}</span>
          </button>

          <button class="btn-secondary" id="btn-review-steps">
            <span>${this.t('reviewSteps')}</span>
          </button>
        </div>
      </div>
    `;
  }

  renderSopDocView(guide) {
    const isVi = this.currentLang === 'vi';
    return `
      <div class="sop-doc-container">
        <!-- Floating Document Toolbar -->
        <div class="sop-doc-toolbar">
          <button class="sop-toolbar-btn primary" id="sop-doc-to-step-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>${this.t('viewStepGuide')}</span>
          </button>
          <button class="sop-toolbar-btn" id="sop-doc-print-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>${this.t('printSopBtn')}</span>
          </button>
        </div>

        <!-- SOP Document Sheet (Standard 2-Page Format of Chen Kai SOP) -->
        <div class="sop-sheet">
          <!-- ================= PAGE 1 ================= -->
          <div class="sop-page-block sop-page-1">
            <!-- Header Table -->
            <table class="sop-table-bordered">
              <tr>
                <td rowspan="2" class="sop-table-header-company" style="width: 44%;">
                  <div class="vi">CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI</div>
                  <div class="zh">振凱精密工業责任有限公司</div>
                </td>
                <td class="sop-cell-lbl">文件编号</td>
                <td class="sop-cell-val">${guide.sopNumber}</td>
                <td class="sop-cell-lbl">制定日期</td>
                <td class="sop-cell-val">${guide.issueDate}</td>
              </tr>
              <tr>
                <td class="sop-cell-lbl">适用对象</td>
                <td class="sop-cell-val">ERP工业平板</td>
                <td class="sop-cell-lbl">编 制</td>
                <td class="sop-cell-val">${guide.author}</td>
              </tr>
              <tr>
                <td class="sop-title-banner">
                  标 准 作 业 指 导 书
                  <div class="sub-vi">Bản Hướng Dẫn Thao Tác Tiêu Chuẩn (SOP)</div>
                </td>
                <td class="sop-cell-lbl">平板版本</td>
                <td class="sop-cell-val">${guide.tabletVersion}</td>
                <td class="sop-cell-lbl">审 批</td>
                <td class="sop-cell-val">${guide.approvalDate}</td>
              </tr>
            </table>

            <!-- Section: 作业准备 -->
            <table class="sop-table-bordered" style="margin-top: -1px;">
              <tr>
                <th rowspan="2" class="sop-prep-title">
                  作<br/>业<br/>准<br/>备
                </th>
                <th class="sop-prep-th">设备（平板）</th>
                <th class="sop-prep-th">工  具（扫码器）</th>
                <th class="sop-prep-th">其  他（标签纸）</th>
              </tr>
              <tr>
                <td class="sop-prep-td">
                  <img src="./assets/sop/erp/eq_tablet.png" class="sop-prep-img sop-doc-img" data-img-src="./assets/sop/erp/eq_tablet.png" alt="设备（平板）" />
                </td>
                <td class="sop-prep-td">
                  <img src="./assets/sop/erp/tool_scanner.png" class="sop-prep-img sop-doc-img" data-img-src="./assets/sop/erp/tool_scanner.png" alt="工 具（扫码器）" />
                </td>
                <td class="sop-prep-td">
                  <img src="./assets/sop/erp/tool_labels.png" class="sop-prep-img sop-doc-img" data-img-src="./assets/sop/erp/tool_labels.png" alt="其 他（标签纸）" />
                </td>
              </tr>
            </table>

            <!-- Flow Banner Page 1 -->
            <div class="sop-flow-banner">--- 作  业  标  准  流  程 ---</div>

            <!-- Flow Table Page 1 (Steps 1 to 5) -->
            <table class="sop-table-bordered sop-flow-tbl" style="margin-top: -1px;">
              <thead>
                <tr>
                  <th style="width: 8%;">步骤</th>
                  <th style="width: 20%;">作 业 名 称</th>
                  <th style="width: 44%;">作 业 说 明</th>
                  <th style="width: 28%;">相 关 图 示</th>
                </tr>
              </thead>
              <tbody>
                <!-- 步骤 1 -->
                <tr>
                  <td class="sop-step-num">1</td>
                  <td class="sop-action-name">
                    开机界面
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal;">Giao diện mở máy</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p>连接电源、网路、扫码器、放置打印纸完成后，在平板顶部，左边“红色键”为“开机按键”，直接开机，进入平板主界面. 
                      <span class="sop-inline-img-link sop-doc-img" data-img-src="./assets/sop/erp/step1_thumb_switch.png"><img src="./assets/sop/erp/step1_thumb_switch.png" alt="红色键" /></span>
                    </p>
                    <p>点击“应用程序”，进入ERP安装程序界面.</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Kết nối nguồn, mạng, máy quét, giấy in, mở nút đỏ ở đỉnh bên trái để bật máy tính bảng. Nhấp [Ứng dụng] để vào cài đặt ERP.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step1_boot.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step1_boot.png" alt="步骤1图示" />
                  </td>
                </tr>

                <!-- 步骤 2 -->
                <tr>
                  <td class="sop-step-num">2</td>
                  <td class="sop-action-name">
                    ERP登录
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal;">Đăng nhập ERP</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p>直接在平板上触屏点击“企助物联”APP ，进入ERP界面.
                      <span class="sop-inline-img-link sop-doc-img" data-img-src="./assets/sop/erp/step2_thumb_app.png"><img src="./assets/sop/erp/step2_thumb_app.png" alt="企助物联" /></span>
                    </p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Trực tiếp chạm vào ứng dụng “企助物联” trên màn hình để vào ERP.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step2_erp_login.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step2_erp_login.png" alt="步骤2图示" />
                  </td>
                </tr>

                <!-- 步骤 3 -->
                <tr>
                  <td class="sop-step-num">3</td>
                  <td class="sop-action-name">
                    ERP登录
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal;">Đăng nhập ERP (Tài khoản)</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p>手指触屏，录入使用人的账户、密码，点击平板最下方的“蓝色登录键”，进入ERP操作界面.</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Dùng tay nhập tài khoản, mật khẩu, tích nhớ mật khẩu và nhấp nút màu xanh lam ở mép dưới để đăng nhập.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step3_login_fields.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step3_login_fields.png" alt="步骤3图示" />
                  </td>
                </tr>

                <!-- 步骤 4 -->
                <tr>
                  <td class="sop-step-num">4</td>
                  <td class="sop-action-name">
                    ERP报工操作
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal;">Vào MES Trung tâm</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p>手指触屏点击“企助MES中心”
                      <span class="sop-inline-img-link sop-doc-img" data-img-src="./assets/sop/erp/step4_thumb_mes.png"><img src="./assets/sop/erp/step4_thumb_mes.png" alt="MES中心" /></span>
                    </p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Chạm màn hình nhấp vào ô màu hồng [企助 MES 中心].</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step4_mes_center.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step4_mes_center.png" alt="步骤4图示" />
                  </td>
                </tr>

                <!-- 步骤 5 -->
                <tr>
                  <td class="sop-step-num">5</td>
                  <td class="sop-action-name">
                    ERP报工操作
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal;">Vào Quét mã báo công</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p>手指触屏点击“扫码报工”
                      <span class="sop-inline-img-link sop-doc-img" data-img-src="./assets/sop/erp/step5_thumb_scan.png"><img src="./assets/sop/erp/step5_thumb_scan.png" alt="扫码报工" /></span>
                    </p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Chạm màn hình nhấp vào biểu tượng súng quét [扫码报工].</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step5_scan_report.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step5_scan_report.png" alt="步骤5图示" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="sop-page-footer">第 1 页  共 2 页</div>
          </div>

          <!-- ================= PAGE 2 ================= -->
          <div class="sop-page-block sop-page-2">
            <div class="sop-flow-banner">--- 作  业  标  准  流  程 ---</div>

            <table class="sop-table-bordered sop-flow-tbl" style="margin-top: -1px;">
              <thead>
                <tr>
                  <th style="width: 8%;">步骤</th>
                  <th style="width: 20%;">作 业 名 称</th>
                  <th style="width: 44%;">作 业 说 明</th>
                  <th style="width: 28%;">相 关 图 示</th>
                </tr>
              </thead>
              <tbody>
                <!-- 步骤 6 Row 1 (Tab 接收) -->
                <tr>
                  <td rowspan="3" class="sop-step-num">6</td>
                  <td rowspan="3" class="sop-action-name">
                    ERP货物接收<br/>（材料/开工接收）
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal; margin-top: 4px;">Tiếp nhận hàng hóa (Nguyên vật liệu / Khởi động tiếp nhận)</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p><strong>进入ERP扫码界面：</strong><br/>在收到货物后必须先做接收，点击“接收”</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Vào giao diện quét mã ERP: Sau khi nhận hàng bắt buộc phải làm tiếp nhận trước, nhấp chọn tab “Tiếp nhận” (接收).</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step6_thumb_receive.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step6_thumb_receive.png" alt="接收标签" />
                  </td>
                </tr>

                <!-- 步骤 6 Row 2 (扫码操作 & 履历卡) -->
                <tr>
                  <td class="sop-action-desc">
                    <p>在ERP扫码界面，光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码，操作方式：</p>
                    <p>• 扫“工序”二维码；</p>
                    <p>• 扫“派工单号”二维码；</p>
                    <p><strong>接收生产履历卡“实物数量”注意事项：</strong><br/>核对填写”接收数”,生产履历卡实物数与接收数一致时，直接点“接收”完成.</p>
                    <div class="sop-warning-inline">不允许手动修改：接收数 < 实物数</div>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Dùng súng quét mã Thẻ lưu chuyển sản xuất: 1.Quét mã 工序, 2.Quét mã 派工单号. Đối chiếu số lượng thực tế và số lượng tiếp nhận. Lưu ý cấm sửa: Tiếp nhận &lt; Thực tế.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/tool_scanner.png" class="sop-doc-img" data-img-src="./assets/sop/erp/tool_scanner.png" alt="扫码器" style="max-height: 50px;" />
                    <img src="./assets/sop/erp/routing_card_qr_guide.png" class="sop-doc-img" data-img-src="./assets/sop/erp/routing_card_qr_guide.png" alt="生产履历卡" />
                  </td>
                </tr>

                <!-- 步骤 6 Row 3 (开工接收界面) -->
                <tr>
                  <td class="sop-action-desc">
                    <p><strong>开工接收操作界面核对：</strong><br/>系统自动带入品名、规格、图号。核对实物数量与接收数无误后，点击“接收”按键完成。</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Màn hình 開工接收: Kiểm tra thông tin tự động hiển thị, điền số nhận và bấm nút [Tiếp nhận] để hoàn thành.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step6_receive_form.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step6_receive_form.png" alt="开工接收界面" />
                  </td>
                </tr>

                <!-- 步骤 7 Row 1 (Tab 提交) -->
                <tr>
                  <td rowspan="4" class="sop-step-num">7</td>
                  <td rowspan="4" class="sop-action-name">
                    扫码过站<br/>（完工提交）
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal; margin-top: 4px;">Quét mã qua trạm (Nộp hoàn công)</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p><strong>进入ERP扫码界面：</strong><br/>制造部门完工品扫码报工，点击“提交”</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Vào giao diện quét mã ERP: Bộ phận sản xuất hoàn thành sản phẩm nhấp vào tab màu xanh lá “Nộp” (提交).</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step7_thumb_submit.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step7_thumb_submit.png" alt="提交标签" />
                  </td>
                </tr>

                <!-- 步骤 7 Row 2 (扫码、填OK/NG、提交打印 & 打印异常说明) -->
                <tr>
                  <td class="sop-action-desc">
                    <p>在ERP扫码界面，光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码，操作方式：</p>
                    <p>• 扫“工序”二维码；</p>
                    <p>• 扫“派工单号”二维码；</p>
                    <p>• 填写报工数“OK”数量；</p>
                    <p>• 填写不良数“NG品”数量（如有）；</p>
                    <p>• 点击“提交打印”，完成.
                      <span class="sop-inline-img-link sop-doc-img" data-img-src="./assets/sop/erp/step7_printed_tag.png"><img src="./assets/sop/erp/step7_printed_tag.png" alt="工艺流转卡" /></span>
                    </p>
                    <div class="sop-warning-inline" style="color: #B45309; background: #FFFBEB; border-color: #F59E0B;">
                      <strong>打印异常：</strong>工序流转卡标签未正常打印，不要退出打印界面，可直接在当前界面重新点击“打印”
                      <span class="sop-inline-img-link sop-doc-img" data-img-src="./assets/sop/erp/step7_thumb_reprint_btn.png"><img src="./assets/sop/erp/step7_thumb_reprint_btn.png" alt="打印按键" /></span>
                      即可打印此张报工标签.
                    </div>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Quét mã 工序 & 派工单号, điền OK, điền NG (nếu có), bấm “提交并打印”. Khi tem chưa ra: KHÔNG ĐƯỢC THOÁT, bấm ngay nút “In” trên màn hình để in lại.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/tool_scanner.png" class="sop-doc-img" data-img-src="./assets/sop/erp/tool_scanner.png" alt="扫码器" style="max-height: 50px;" />
                    <img src="./assets/sop/erp/routing_card_qr_guide.png" class="sop-doc-img" data-img-src="./assets/sop/erp/routing_card_qr_guide.png" alt="生产履历卡" />
                  </td>
                </tr>

                <!-- 步骤 7 Row 3 (完工提交界面) -->
                <tr>
                  <td class="sop-action-desc">
                    <p><strong>完工提交详细界面图示：</strong><br/>1.当前工序 2.工单 3.填OK报工数 4.填NG不良数 5.点击“提交并打印”。</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Màn hình 完工提交: Quét công đoạn, quét phiếu, điền số OK, điền số NG và bấm [提交并打印].</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step7_station_form.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step7_station_form.png" alt="完工提交界面" />
                  </td>
                </tr>

                <!-- 步骤 7 Row 4 (打印异常界面) -->
                <tr>
                  <td class="sop-action-desc">
                    <p><strong>重新打印标签纸界面图示：</strong><br/>弹出打印异常窗口时，请勿点击右上角 ✕ 退出，直接重新点击蓝色“打印”按键即可正常出纸。</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Giao diện in lại tem: Không bấm ✕ thoát ra, bấm nút [打印] màu xanh lam để in lại tem.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step7_reprint_dialog.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step7_reprint_dialog.png" alt="打印异常界面" />
                  </td>
                </tr>

                <!-- 步骤 8 (打印纸) -->
                <tr>
                  <td class="sop-step-num">8</td>
                  <td class="sop-action-name">
                    打印纸<br/>（放置或更换）
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal; margin-top: 4px;">Giấy in nhiệt (Đặt vào hoặc thay thế)</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p><strong>打印机：</strong>在平板下方“打印纸”放置区，打开盖子.</p>
                    <p><strong>打印纸：</strong>将打印纸“正面”放置到纸槽OK后关闭即可.</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Máy in: Tại khoang đặt giấy in ở phía dưới máy tính bảng, mở nắp. Giấy in: Đặt cuộn giấy đúng mặt chính vào rãnh OK rồi đóng nắp lại.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step8_printer_door_closed.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step8_printer_door_closed.png" alt="打开打印纸盖子" />
                    <img src="./assets/sop/erp/step8_printer_roll_feed.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step8_printer_roll_feed.png" alt="放置打印纸" />
                  </td>
                </tr>

                <!-- 步骤 9 (其他操作) -->
                <tr>
                  <td class="sop-step-num">9</td>
                  <td class="sop-action-name">
                    其他操作
                    ${isVi ? '<div style="font-size: 11px; color: #475569; font-weight: normal; margin-top: 4px;">Các thao tác khác (Phím điều hướng)</div>' : ''}
                  </td>
                  <td class="sop-action-desc">
                    <p>在屏幕最下方的按键功能说明：</p>
                    <p>1. [返回上一页] （◀ 箭头）：返回上级界面</p>
                    <p>2. [切换界面] （■ 方块）：多任务窗口切换</p>
                    <p>3. [重启] （⏻ 电源键）：重新启动平板</p>
                    <p>4. [关机] （⏻ 电源键）：关闭平板设备</p>
                    ${isVi ? '<div style="font-size: 11px; color: #475569; margin-top: 4px; border-top: 1px dotted #CBD5E1; padding-top: 4px;">Chức năng phím đáy màn hình: ◀ Quay lại trang trước, ■ Chuyển đổi giao diện đa nhiệm, ⏻ Khởi động lại / Tắt máy tính bảng.</div>' : ''}
                  </td>
                  <td class="sop-cell-img-box">
                    <img src="./assets/sop/erp/step9_bottom_keys.png" class="sop-doc-img" data-img-src="./assets/sop/erp/step9_bottom_keys.png" alt="底部按键" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="sop-page-footer">第 2 页  共 2 页</div>
          </div>
        </div>
      </div>
    `;
  }

  renderBottomNav() {
    return `
      <nav class="bottom-nav">
        <button class="nav-tab-item ${this.currentView === 'home' ? 'active' : ''}" data-tab="home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span class="nav-tab-label">${this.t('tabHome')}</span>
        </button>

        <button class="nav-tab-item ${this.currentView === 'all-guides' ? 'active' : ''}" data-tab="all-guides">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span class="nav-tab-label">${this.t('tabGuides')}</span>
        </button>
      </nav>
    `;
  }

  renderModal() {
    const modalRoot = document.getElementById('image-modal-root');
    if (!modalRoot) return;

    if (!this.modalState.isOpen) {
      modalRoot.innerHTML = '';
      return;
    }

    const hasModalGallery = this.modalState.galleryImages && this.modalState.galleryImages.length > 1;

    modalRoot.innerHTML = `
      <div class="modal-overlay ${this.modalState.isOpen ? 'active' : ''}" id="modal-overlay">
        <header class="modal-header">
          <div class="modal-title-text">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>${this.t('fullscreenTitle')}${hasModalGallery ? ` (${this.modalState.activeGalleryIndex + 1}/${this.modalState.galleryImages.length})` : ''}</span>
          </div>
          <button class="modal-close-btn" id="modal-close-btn" title="Close">✕</button>
        </header>

        <div class="modal-viewport" id="modal-viewport">
          <div class="modal-img-container" id="modal-img-container" style="
            transform: translate(${this.modalState.posX}px, ${this.modalState.posY}px) scale(${this.modalState.scale});
          ">
            <img src="${this.modalState.imgSrc}" class="modal-img" alt="Zoom Preview" draggable="false" />
            
            ${(this.modalState.showAnnotations && this.modalState.annotations && this.modalState.annotations.length > 0) ? `
              <div class="annotations-layer">
                ${this.modalState.annotations.map(ann => {
                  if (ann.type === 'box') {
                    return `
                      <div class="annotation-box" style="
                        left: ${ann.x}%; 
                        top: ${ann.y}%; 
                        width: ${ann.width}%; 
                        height: ${ann.height}%;
                      "></div>
                    `;
                  } else if (ann.type === 'badge') {
                    return `
                      <div class="annotation-badge" style="left: ${ann.x}%; top: ${ann.y}%;">
                        ${ann.number || 1}
                      </div>
                    `;
                  }
                  return '';
                }).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <footer class="modal-controls-bar">
          ${hasModalGallery ? `
            <button class="modal-ctrl-btn" id="modal-prev-img" title="${this.t('galleryPrevImage')}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>${this.t('galleryPrevImage')}</span>
            </button>
          ` : ''}

          <button class="modal-ctrl-btn" id="modal-zoom-in">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>${this.t('zoomIn')}</span>
          </button>

          <button class="modal-ctrl-btn" id="modal-zoom-out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>${this.t('zoomOut')}</span>
          </button>

          <button class="modal-ctrl-btn" id="modal-zoom-reset">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            <span>${this.t('zoomReset')}</span>
          </button>

          <button class="modal-ctrl-btn" id="modal-toggle-ann">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>${this.t('toggleAnnotations')}</span>
          </button>

          ${hasModalGallery ? `
            <button class="modal-ctrl-btn" id="modal-next-img" title="${this.t('galleryNextImage')}">
              <span>${this.t('galleryNextImage')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ` : ''}
        </footer>
      </div>
    `;

    this.attachModalEventListeners();
  }

  attachEventListeners() {
    // Language Switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });

    // Desktop Frame Toggle (390x844 vs Full width)
    const frameBtn = document.getElementById('toggle-frame-btn');
    if (frameBtn) {
      frameBtn.addEventListener('click', () => {
        this.isDeviceFullWidth = !this.isDeviceFullWidth;
        this.render();
      });
    }

    // Header Back button
    const backBtn = document.getElementById('header-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (this.currentView === 'step-guide') {
          this.navigateTo('detail', { guideId: this.activeGuideId });
        } else if (this.currentView === 'sop-doc') {
          this.navigateTo('detail', { guideId: this.activeGuideId });
        } else if (this.currentView === 'detail') {
          this.navigateTo('home');
        }
      });
    }

    // SOP Document View Buttons
    document.querySelectorAll('#view-sop-doc-btn, #view-sop-doc-banner, #step-open-doc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigateTo('sop-doc', { guideId: this.activeGuideId });
      });
    });

    const sopDocToStepBtn = document.getElementById('sop-doc-to-step-btn');
    if (sopDocToStepBtn) {
      sopDocToStepBtn.addEventListener('click', () => {
        this.navigateTo('step-guide', { guideId: this.activeGuideId, stepIndex: 0 });
      });
    }

    const sopDocPrintBtn = document.getElementById('sop-doc-print-btn');
    if (sopDocPrintBtn) {
      sopDocPrintBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Click on any image in SOP document to zoom
    document.querySelectorAll('.sop-doc-img, .sop-inline-img-link').forEach(imgEl => {
      imgEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = imgEl.getAttribute('data-img-src') || (imgEl.tagName === 'IMG' ? imgEl.getAttribute('src') : imgEl.querySelector('img')?.getAttribute('src'));
        if (src) {
          this.openImageModal(src);
        }
      });
    });

    // Search input
    const searchInput = document.getElementById('home-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
        // Maintain input focus
        const nextInput = document.getElementById('home-search-input');
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
        }
      });
    }

    const searchClear = document.getElementById('search-clear-btn');
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        this.searchQuery = '';
        this.render();
      });
    }

    // Category chips
    document.querySelectorAll('.chip-btn').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-category');
        this.activeCategory = cat;
        this.render();
      });
    });

    // Guide cards & Recent hero card click -> open detail
    document.querySelectorAll('.guide-card, .recent-hero-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const guideId = e.currentTarget.getAttribute('data-guide-id');
        this.navigateTo('detail', { guideId });
      });
    });

    // Step timeline item click in detail -> jump to step
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const stepIdx = parseInt(e.currentTarget.getAttribute('data-step-index'), 10);
        this.navigateTo('step-guide', { guideId: this.activeGuideId, stepIndex: stepIdx });
      });
    });

    // Start Guide button in detail
    const startBtn = document.getElementById('start-guide-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.navigateTo('step-guide', { guideId: this.activeGuideId, stepIndex: 0 });
      });
    }

    // Step Image click -> open fullscreen zoom modal
    const imgCard = document.getElementById('step-image-card');
    if (imgCard) {
      imgCard.addEventListener('click', () => {
        const guide = this.getActiveGuide();
        const step = guide.steps[this.currentStepIndex];
        const activeSrc = imgCard.getAttribute('data-img-src') || step.image;
        this.openImageModal(activeSrc, step.annotations, step.images, this.activeGalleryImgIndex);
      });
    }

    // Gallery tab buttons click
    document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(e.currentTarget.getAttribute('data-gallery-index'), 10);
        this.activeGalleryImgIndex = idx;
        this.playFeedbackTone('step');
        this.render();
      });
    });

    // Gallery arrow prev
    const prevArrow = document.getElementById('gallery-prev-arrow');
    if (prevArrow) {
      prevArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        const guide = this.getActiveGuide();
        const step = guide.steps[this.currentStepIndex];
        if (step.images && step.images.length > 1) {
          let nextIdx = this.activeGalleryImgIndex - 1;
          if (nextIdx < 0) nextIdx = step.images.length - 1;
          this.activeGalleryImgIndex = nextIdx;
          this.playFeedbackTone('step');
          this.render();
        }
      });
    }

    // Gallery arrow next
    const nextArrow = document.getElementById('gallery-next-arrow');
    if (nextArrow) {
      nextArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        const guide = this.getActiveGuide();
        const step = guide.steps[this.currentStepIndex];
        if (step.images && step.images.length > 1) {
          let nextIdx = (this.activeGalleryImgIndex + 1) % step.images.length;
          this.activeGalleryImgIndex = nextIdx;
          this.playFeedbackTone('step');
          this.render();
        }
      });
    }

    // TTS Speaker: Detail Overview Voice
    const speakDetailBtn = document.getElementById('btn-speak-detail');
    if (speakDetailBtn) {
      speakDetailBtn.addEventListener('click', () => {
        const guide = this.getActiveGuide();
        const toolList = guide.tools.map(t => t.name[this.currentLang]).join(', ');
        const textToRead = `${guide.title[this.currentLang]}. ${guide.subtitle[this.currentLang]}. ${this.currentLang === 'vi' ? 'Thiết bị chuẩn bị: ' : '作业准备: '}${toolList}. ${this.currentLang === 'vi' ? 'Yêu cầu an toàn: ' : '安全确认: '}${guide.prerequisites[this.currentLang]}`;
        this.speakText(textToRead, 'detail-overview');
      });
    }

    // TTS Speaker: Step-by-Step Full Audio Readout
    const speakStepFullBtn = document.getElementById('btn-speak-step-full');
    if (speakStepFullBtn) {
      speakStepFullBtn.addEventListener('click', () => {
        const guide = this.getActiveGuide();
        const step = guide.steps[this.currentStepIndex];
        const stepPrefix = this.currentLang === 'vi' ? `Bước ${step.stepNumber}: ` : `第 ${step.stepNumber} 步: `;
        const warningText = step.warning ? (this.currentLang === 'vi' ? ` Lưu ý quan trọng: ${step.warning[this.currentLang]}` : ` 重要提示: ${step.warning[this.currentLang]}`) : '';
        const textToRead = `${stepPrefix}${step.name[this.currentLang]}. ${step.instructions[this.currentLang].join('. ')}.${warningText}`;
        this.speakText(textToRead, 'step-full');
      });
    }

    // TTS Speaker: Individual Line & Warning Speaker buttons
    document.querySelectorAll('.btn-speaker-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid triggering checkmark toggle
        const encodedText = e.currentTarget.getAttribute('data-speak-text');
        const speakId = e.currentTarget.getAttribute('data-speak-id');
        if (encodedText) {
          const rawText = decodeURIComponent(encodedText);
          this.speakText(rawText, speakId);
        }
      });
    });

    // Sub-step check items
    document.querySelectorAll('.instruction-check-area').forEach(item => {
      item.addEventListener('click', (e) => {
        const key = e.currentTarget.getAttribute('data-substep-key');
        this.toggleSubStepCheck(key);
      });
    });

    // Step Action Buttons
    const prevBtn = document.getElementById('btn-prev-step');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.handlePrevStep());
    }

    const nextBtn = document.getElementById('btn-next-step');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.handleNextStep());
    }

    // Completion buttons
    const backHomeBtn = document.getElementById('btn-back-home');
    if (backHomeBtn) {
      backHomeBtn.addEventListener('click', () => {
        this.navigateTo('home');
      });
    }

    const reviewBtn = document.getElementById('btn-review-steps');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        this.navigateTo('step-guide', { guideId: this.activeGuideId, stepIndex: 0 });
      });
    }

    // Bottom Tab navigation
    document.querySelectorAll('.nav-tab-item').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.currentTarget.getAttribute('data-tab');
        this.navigateTo(tabName);
      });
    });
  }

  attachModalEventListeners() {
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeImageModal());
    }

    const modalPrevBtn = document.getElementById('modal-prev-img');
    if (modalPrevBtn) {
      modalPrevBtn.addEventListener('click', () => {
        const imgs = this.modalState.galleryImages;
        if (imgs && imgs.length > 1) {
          let nextIdx = this.modalState.activeGalleryIndex - 1;
          if (nextIdx < 0) nextIdx = imgs.length - 1;
          this.modalState.activeGalleryIndex = nextIdx;
          this.modalState.imgSrc = imgs[nextIdx].src;
          this.modalState.scale = 1;
          this.modalState.posX = 0;
          this.modalState.posY = 0;
          this.activeGalleryImgIndex = nextIdx;
          this.renderModal();
          this.render();
        }
      });
    }

    const modalNextBtn = document.getElementById('modal-next-img');
    if (modalNextBtn) {
      modalNextBtn.addEventListener('click', () => {
        const imgs = this.modalState.galleryImages;
        if (imgs && imgs.length > 1) {
          let nextIdx = (this.modalState.activeGalleryIndex + 1) % imgs.length;
          this.modalState.activeGalleryIndex = nextIdx;
          this.modalState.imgSrc = imgs[nextIdx].src;
          this.modalState.scale = 1;
          this.modalState.posX = 0;
          this.modalState.posY = 0;
          this.activeGalleryImgIndex = nextIdx;
          this.renderModal();
          this.render();
        }
      });
    }

    const zoomInBtn = document.getElementById('modal-zoom-in');
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        this.modalState.scale = Math.min(4, this.modalState.scale + 0.4);
        this.updateModalTransform();
      });
    }

    const zoomOutBtn = document.getElementById('modal-zoom-out');
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        this.modalState.scale = Math.max(1, this.modalState.scale - 0.4);
        if (this.modalState.scale === 1) {
          this.modalState.posX = 0;
          this.modalState.posY = 0;
        }
        this.updateModalTransform();
      });
    }

    const zoomResetBtn = document.getElementById('modal-zoom-reset');
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', () => {
        this.modalState.scale = 1;
        this.modalState.posX = 0;
        this.modalState.posY = 0;
        this.updateModalTransform();
      });
    }

    const toggleAnnBtn = document.getElementById('modal-toggle-ann');
    if (toggleAnnBtn) {
      toggleAnnBtn.addEventListener('click', () => {
        this.modalState.showAnnotations = !this.modalState.showAnnotations;
        this.renderModal();
      });
    }

    // Drag & Pan support in Modal Viewport
    const viewport = document.getElementById('modal-viewport');
    if (viewport) {
      // Mouse events
      viewport.addEventListener('mousedown', (e) => {
        if (this.modalState.scale > 1) {
          this.modalState.isDragging = true;
          this.modalState.startX = e.clientX - this.modalState.posX;
          this.modalState.startY = e.clientY - this.modalState.posY;
        }
      });

      window.addEventListener('mousemove', (e) => {
        if (this.modalState.isDragging) {
          this.modalState.posX = e.clientX - this.modalState.startX;
          this.modalState.posY = e.clientY - this.modalState.startY;
          this.updateModalTransform();
        }
      });

      window.addEventListener('mouseup', () => {
        this.modalState.isDragging = false;
      });

      // Wheel Zoom
      viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.002;
        this.modalState.scale = Math.min(4, Math.max(1, this.modalState.scale + delta));
        if (this.modalState.scale === 1) {
          this.modalState.posX = 0;
          this.modalState.posY = 0;
        }
        this.updateModalTransform();
      }, { passive: false });

      // Click backdrop to close modal
      viewport.addEventListener('click', (e) => {
        if (e.target === viewport) {
          this.closeImageModal();
        }
      });
    }
  }

  updateModalTransform() {
    const container = document.getElementById('modal-img-container');
    if (container) {
      container.style.transform = `translate(${this.modalState.posX}px, ${this.modalState.posY}px) scale(${this.modalState.scale})`;
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new WorkGuideApp();
});
