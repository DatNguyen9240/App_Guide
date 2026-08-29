// WorkGuide - Main Application Controller
import { i18n } from './i18n.js';
import { guidesData } from './data.js';

class WorkGuideApp {
  constructor() {
    // Application State
    this.currentLang = localStorage.getItem('workguide_lang') || 'vi';
    this.currentView = 'home'; // 'home' | 'all-guides' | 'detail' | 'step-guide' | 'completion'
    this.activeGuideId = 'sop-erp-tablet';
    this.currentStepIndex = 0;
    this.searchQuery = '';
    this.activeCategory = 'all';
    this.activePlant = 'all';
    this.checkedSubSteps = new Set();
    this.guideStartTime = null;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.isDeviceFullWidth = false;

    // Fullscreen Zoom & Pan Modal State
    this.modalState = {
      isOpen: false,
      scale: 1,
      posX: 0,
      posY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      showAnnotations: true
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

    const cleanText = text.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
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

  openImageModal(imgSrc, annotations = []) {
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
      showAnnotations: true
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
      case 'completion':
        return this.renderCompletionView(guide);
      default:
        return this.renderHomeView();
    }
  }

  renderHomeView() {
    const categories = [
      { id: 'all', labelKey: 'allCategories', icon: 'grid' },
      { id: 'catERP', labelKey: 'catERP', icon: 'tablet' },
      { id: 'catQC', labelKey: 'catQC', icon: 'check-circle' },
      { id: 'catWarehouse', labelKey: 'catWarehouse', icon: 'package' },
      { id: 'catMaintenance', labelKey: 'catMaintenance', icon: 'tool' }
    ];

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
      { id: 'catERP', labelKey: 'catERP', icon: 'tablet' },
      { id: 'catQC', labelKey: 'catQC', icon: 'check-circle' },
      { id: 'catWarehouse', labelKey: 'catWarehouse', icon: 'package' },
      { id: 'catMaintenance', labelKey: 'catMaintenance', icon: 'tool' }
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
          <span>${this.t('stepOverview')}</span>
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
      <div class="step-action-bar">
        <button class="btn-primary-full" id="start-guide-btn">
          <span>${this.t('startGuideBtn')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    `;
  }

  renderStepGuideView(guide) {
    const step = guide.steps[this.currentStepIndex];
    const totalSteps = guide.steps.length;
    const progressPercent = ((this.currentStepIndex + 1) / totalSteps) * 100;

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
              ${this.t('stepOf', { current: step.stepNumber, total: totalSteps })}
            </span>
            <button class="btn-speaker-header btn-speaker" data-speak-id="step-full" id="btn-speak-step-full" title="${this.t('listenStep')}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span class="speaker-label">${this.t('listenAudio')}</span>
              <span class="sound-wave-anim"><i></i><i></i><i></i></span>
            </button>
          </div>
          <h2 class="step-main-title">${step.name[this.currentLang]}</h2>
        </div>

        <!-- Instructional Visual Card with Annotations -->
        <div class="step-visual-card" id="step-image-card">
          <div class="step-visual-viewport">
            <img src="${step.image}" class="step-image" alt="${step.name[this.currentLang]}" />
            
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

    modalRoot.innerHTML = `
      <div class="modal-overlay ${this.modalState.isOpen ? 'active' : ''}" id="modal-overlay">
        <header class="modal-header">
          <div class="modal-title-text">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>${this.t('fullscreenTitle')}</span>
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
        } else if (this.currentView === 'detail') {
          this.navigateTo('home');
        }
      });
    }

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
        this.openImageModal(step.image, step.annotations);
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
