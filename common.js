// common.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- Firebase Configuration ---
// ※ご自身のFirebaseプロジェクトの設定に書き換えてください
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "qcda-quiz-king.firebaseapp.com",
    projectId: "qcda-quiz-king",
    storageBucket: "qcda-quiz-king.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// --- 共通UI初期化関数 ---
export const initCommonUI = (appName = "みんなで〇〇王！") => {
    // 1. ヘッダーの生成
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <a href="index.html" id="header-title">${appName}</a>
            <div id="hamburger-icon">
                <div class="bar1"></div><div class="bar2"></div><div class="bar3"></div>
            </div>
            <div id="side-menu">
                <a href="guide.html" target="_blank" class="menu-link">使い方ガイド</a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdlvIr5ehyy3dInl_XTkA5F64H7yFIigL2dzFW0IoXnl8ajdw/viewform?usp=dialog" target="_blank" class="menu-link">お問い合わせ</a>
                <a href="release-notes.html" target="_blank" class="menu-link" style="border-bottom: 2px solid #e5e7eb;">リリースノート</a>
                
                <a href="https://qcda-dev.github.io/HP/" target="_blank" class="menu-link" style="margin-top: 10px; border-bottom: none;">QcDa Projectとは</a>
                <a href="https://qcda-dev.github.io/HP/terms-of-service.html" target="_blank" class="menu-sub-link">利用規約</a>
                <a href="https://qcda-dev.github.io/HP/community-guidelines.html" target="_blank" class="menu-sub-link">コミュニティガイドライン</a>
                
                <span class="menu-ver">ver 1.0.0</span>
            </div>
            <div id="menu-overlay"></div>
        `;

        // ハンバーガーメニューの開閉ロジック
        const hamburger = document.getElementById('hamburger-icon');
        const sideMenu = document.getElementById('side-menu');
        const overlay = document.getElementById('menu-overlay');

        const toggleMenu = () => {
            hamburger.classList.toggle('open');
            sideMenu.classList.toggle('open');
            overlay.classList.toggle('open');
        };

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // 2. フッターの生成
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div style="margin-bottom: 10px;">
                <a href="https://qcda-dev.github.io/HP/terms-of-service.html" target="_blank">利用規約</a>
                <a href="https://qcda-dev.github.io/HP/community-guidelines.html" target="_blank">コミュニティガイドライン</a>
            </div>
            <div>&copy; 2025 QcDa Project. All Rights Reserved.</div>
        `;
    }
};

// --- ローディング表示ユーティリティ ---
export const showLoading = (message = "処理中...") => {
    let overlay = document.getElementById('loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = `<div class="spinner"></div><div id="loading-msg" style="color:#4b5563; font-weight:bold;">${message}</div>`;
        document.body.appendChild(overlay);
    } else {
        document.getElementById('loading-msg').textContent = message;
        overlay.classList.remove('hidden');
    }
};

export const hideLoading = () => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.add('hidden');
};

// --- ユーティリティ ---
export const generateProjectCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const copyToClipboard = async (text, successMsg = "コピーしました！") => {
    try {
        await navigator.clipboard.writeText(text);
        alert(successMsg);
    } catch (err) {
        // Fallback for older browsers / iframes
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert(successMsg);
        } catch (e) {
            alert("コピーに失敗しました。手動でコピーしてください。");
        }
        document.body.removeChild(textArea);
    }
};
