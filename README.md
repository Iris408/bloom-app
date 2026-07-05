# Bloom 🌱

Calm routines for every brain.

Bloom is an active full-stack capstone project focused on building a calm, accessible visual routine and task sequencing application. The app is designed to help users create, organise, and follow step-by-step routines in a clear, supportive, and neurodivergent-friendly way.

Bloom currently focuses on **Bloom Personal**, a personal routine, focus, and task support app. The current version is being prepared for public beta feedback with a public Overview page, login modal flow, accessibility page controls, visual identity polish, and gentle feedback collection.

すべての人にやさしい、落ち着いたルーティン管理アプリ。

Bloomは、視覚的なルーティン作成とタスク進行を支援するアクセシビリティ重視のフルスタック・キャップストーンプロジェクトです。ユーザーがステップごとのルーティンを分かりやすく作成・整理・実行できるように設計しており、ニューロダイバージェントフレンドリーな体験を重視しています。

現在は、個人利用向けの **Bloom Personal** を中心に開発しています。現バージョンでは、公開用Overviewページ、ログインモーダル、アクセシビリティ用Page Controls、ビジュアルデザインの改善、ベータフィードバック収集に向けた調整を進めています。

## Project Overview / プロジェクト概要

Bloom is being built as a web-first visual task sequencer and routine builder. The first version focuses on **Bloom Personal**, a personal-use routine app with accessible layouts, task cards, routine pages, progress tracking and multiple user modes.

The long-term vision is **Bloom Education**, which may expand the app into an educational platform for students, parents, teachers, and school administrators. This education phase is planned for the future after the personal version is complete and stable.

Bloomは、Webファーストの視覚的タスクシーケンサーおよびルーティンビルダーとして開発しています。最初のバージョンでは、個人利用向けの **Bloom Personal** に集中し、アクセシブルなレイアウト、タスクカード、ルーティンページ、進捗管理、複数の利用モードを構築していきます。

長期的には、学生、保護者、教師、学校管理者向けの教育プラットフォームである **Bloom Education** への拡張も視野に入れています。この教育向けフェーズは、個人版が安定した後の将来的な計画です。

## Live Demo - [Experience Bloom](https://bloom-app-three-xi.vercel.app/)

## Run Locally / ローカル環境で実行

```bash
git clone https://github.com/Iris408/bloom-app.git
cd bloom-app
npm install
npm run dev     
```

Build check:
```bash
npm run build
```

The app runs locally with Vite, usually at:
```text
http://localhost:5173
```

## Latest Beta Updates / 最新ベータ更新

Recent Bloom beta updates include:

- Redesigned public Overview page based on the Bloom v2 product direction
- Improved CTA flow for demo mode, account creation, and login
- Login modal polish with light/dark mode visual consistency
- Updated About, Privacy, and Accessibility pages
- Page Controls dropdown available from public and protected pages
- Moments page redesigned with memories, small wins, reflections, mood snapshot, favorite quote, featured memory, and top themes
- Avatar picker updated to show a small set of avatars with horizontal scrolling
- Public header and protected app header separated to avoid layout regressions

Feedback is currently handled on the frontend. Backend-connected feedback collection, production-ready account persistence, saved user data, and deeper onboarding are planned for later versions.

### Screenshots / スクリーンショット

<table>
  <tr>
    <td>
      <img src="./public/images/bloom-overview.png" width="400"/>
      <br/>
      <strong>Public Overview / 公開概要ページ</strong>
    </td>
    <td>
      <img src="./public/images/bloom-create-account.png" width="400"/>
      <br/>
      <strong>Create Account Modal / アカウント作成モーダル</strong>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./public/images/bloom-moments.png" width="400"/>
      <br/>
      <strong>Moments / モーメント</strong>
    </td>
    <td>
      <img src="./public/images/bloom-home.png" width="400"/>
      <br/>
      <strong>Home / ホーム</strong>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./public/images/bloom-routines-dark.png" width="400"/>
      <br/>
      <strong>Routines - Dark Mode / ルーティン</strong>
    </td>
    <td>
      <img src="./public/images/bloom-focus-dark.png" width="400"/>
      <br/>
      <strong>Focus - Dark Mode / フォーカス</strong>
    </td>
  </tr>
</table>

## Current Status / 現在のステータス

### v2.1.0 Auth Prep / 認証準備フェーズ

Bloom has completed the public Overview v2 refresh and is now moving into the v2.1.0 authentication phase.

Recent completed work includes:

- Public Overview v2 redesign
- Login and create account modal flow polish
- Public About, Privacy, and Accessibility page spacing fixes
- Public and protected header layout separation
- Protected app sidebar/header layout restoration
- Moments v1.1.0 UI polish
- Favorite Quote card overlap fix
- Avatar picker updated to horizontal scrolling
- Page Controls kept available across public and protected pages

The next development focus is authentication stability, user session restore, logout behaviour, saved avatar choices, and separating demo mode from real account state.

Bloomは、公開用Overview v2のリデザインを完了し、現在はv2.1.0の認証機能フェーズへ移行しています。

最近完了した作業には、公開Overviewページの改善、ログイン/アカウント作成モーダル、About / Privacy / Accessibilityページの余白修正、公開ページと保護ページのヘッダー分離、アプリ内レイアウトの復旧、Moments v1.1.0のUI改善、Favorite Quoteカードの重なり修正、横スクロール式アバター選択、Page Controlsの維持が含まれます。

次の開発では、ログイン状態の安定化、リロード時のユーザー復元、ログアウト処理、アバター選択の保存、デモモードと実ユーザーデータの分離に集中します。


## Current Features / 現在の機能

| EN | 日本語 | EN | 日本語 |
|---|---|---|---|
| Desktop sidebar and Mobile bottom navigation | デスクトップ用サイドバーナビゲーション/モバイル用ボトムナビゲーション | Empty state microcopy improvements | 空状態メッセージの改善 |
| Reusable Bloom button components | 再利用可能なBloomボタンコンポーネント | Public Overview landing page | 公開用Overviewランディングページ |
| Task card and task list components | タスクカード・タスクリストコンポーネント | Login modal overlay | ログインモーダル表示 |
| Emoji picker for new and edited tasks | 新規作成・編集タスク用の絵文字ピッカー | Public About, Privacy, and Accessibility pages | 公開用 About / Privacy / Accessibility ページ |
| Completed task styling with tick and line-through state | チェック表示と取り消し線による完了タスク表示 | Frontend beta feedback flow | ベータフィードバック用フロントエンド導線 |
| Selectable demo routine preview | 選択可能なデモルーティンプレビュー | Header Page Controls dropdown | Header の Page Controls ドロップダウン |
| Load selected demo routines only | 選択したデモルーティンのみ読み込み | Text size controls from S to XL | S〜XL の文字サイズ設定 |
| Global app context structure | グローバルアプリコンテキスト構成 | Light and dark mode | ライトモード・ダークモード |
| Reusable UI component folder | 再利用可能なUIコンポーネントフォルダ | OpenDyslexic font, Reduce motion toggle | OpenDyslexicフォント切り替え /アニメーション軽減設定|
| Reusable empty state component | 再利用可能な空状態コンポーネント | Daily reset behaviour for tasks, routines, routine steps and focus tasks | タスク、ルーティン、ルーティンステップ、集中タスクの日次リセット |
| Moments dashboard | Momentsダッシュボード | Horizontal avatar picker | 横スクロール式アバター選択 |
| Public/protected header separation | 公開/保護ヘッダー分離 | Demo mode entry from Overview | Overviewからのデモモード開始 |
| Favorite Quote card polish | Favorite Quoteカード改善 | Public trust pages | 公開向け信頼ページ |

## Core Goals / 主な目標

| EN | 日本語 |
|---|---|
| Build a calm and accessible routine-building app | 落ち着いて使えるアクセシブルなルーティン作成アプリを構築 |
| Support neurodivergent-friendly user experiences | ニューロダイバージェントフレンドリーなユーザー体験を支援 |
| Provide simple visual step-by-step task guidance | ステップごとの視覚的なタスク案内を提供 |
| Include kid-friendly and adult-friendly modes | 子ども向け・大人向けのモードに対応 |
| Design layouts that work well on desktop and mobile | デスクトップとモバイルの両方で使いやすいレイアウトを設計 |
| Build a strong portfolio-ready full-stack capstone project | ポートフォリオに掲載できるフルスタック・キャップストーンとして成長させる |

## Current Auth Work / 現在の認証作業

Bloom v2.1.0 is focused on making the app authentication flow stable and ready for deeper full-stack work.

Current auth checklist:

- Login flow
- Create account flow
- Logout flow
- Restore current user on refresh
- Protect app pages from unauthenticated access
- Keep demo mode separate from real account data
- Save selected avatar per user
- Improve loading states
- Improve error messages for invalid login, duplicate account, and network errors

Bloom v2.1.0では、今後のフルスタック化に向けて、認証フローを安定させることに集中しています。ログイン、アカウント作成、ログアウト、リロード時のユーザー復元、保護ページ、デモモードと実アカウントの分離、アバター保存、ローディング状態、エラーメッセージの改善を進めています。

## Current Beta Limitations / 現在のベータ版の制限

Bloom is still in active development. Some features are currently frontend-only or demo-based.

Current limitations:

- Feedback is not yet connected to a backend database
- Account creation and authentication are still being stabilised
- Some user data is still stored locally
- Demo mode uses sample data
- Backend persistence, production authentication, and saved user preferences are planned for later versions

Bloomは現在も開発中です。一部の機能はフロントエンドのみ、またはデモデータを使用しています。今後、バックエンド連携、認証、データ永続化、ユーザー設定の保存を追加予定です。

## Planned Features / 今後の予定機能

| EN | 日本語 |
|---|---|
| Onboarding flow | オンボーディングフロー |
| Mood check-in at app open | アプリ起動時の気分チェックイン |
| Short version of routines | ルーティンの短縮版 |
| Oasis calm reset space | Oasis という落ち着いたリセット空間 |
| Time estimates per routine step | ルーティンステップごとの所要時間目安 |
| Missed-day recovery wording | できなかった日の回復を支えるメッセージ |
| Low demand mode | 低負荷モード |
| Exportable progress CSV | 進捗CSVエクスポート |
| Dedicated in-app Feedback page | 専用のアプリ内フィードバックページ |
| Additional accessibility features | その他のアクセシビリティ機能 |
| Persisted user accessibility preferences | ユーザーごとのアクセシビリティ設定保存 |
| v2.1.0 authentication flow and user session handling | v2.1.0 認証フローとユーザーセッション管理 |
| Backend-connected feedback storage | バックエンド連携のフィードバック保存 |
| Database persistence for routines, tasks, focus items, moments and profile settings | ルーティン、タスク、集中項目、Moments、プロフィール設定のデータベース保存 |
| Saved avatar and accessibility preferences per user | ユーザーごとのアバターとアクセシビリティ設定保存 |
| Future full-stack deployment | 将来的なフルスタックデプロイ |

## Backend Security and Configuration / バックエンドのセキュリティと設定

Recent backend configuration improvements include:

- Removed an insecure hardcoded JWT `SECRET_KEY` fallback.
- Added fail-fast backend startup validation when required authentication configuration is missing.
- Moved CORS allowed origins into environment variables for local development and live frontend deployment.
- Configured backend CORS to support both local React/Vite development and the live Vercel frontend.
- Stabilised backend local setup using a Python virtual environment, dependency checks, and local uvicorn testing.

Example backend environment variables:

```env
SECRET_KEY=your_secure_secret_key_here
CORS_ORIGINS=http://localhost:5173,https://your-vercel-app.vercel.app
```

These values should be stored in local `.env` files or deployment environment settings, not hardcoded in source code.

最近のバックエンド設定改善では、JWT用の`SECRET_KEY`の安全性向上、必須設定が不足している場合の起動停止、CORS許可URLの環境変数化、ローカル開発環境とVercel本番フロントエンドの両方に対応する設定を追加しました。

`.env`やデプロイ環境変数に保存すべき値を、ソースコード内に直接書かない構成にしています。

## Tech Stack / 技術スタック

### Current Frontend / 現在のフロントエンド

* React
* JavaScript
* Tailwind CSS
* Vite
* Vercel

### Current Backend / 現在のバックエンド

* Python
* FastAPI
* JWT authentication configuration
* Environment-based CORS configuration
* Python virtual environment setup

## Author
Built by Iris408
