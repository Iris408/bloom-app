# Bloom 🌱

Calm routines for every brain.

Bloom is an active full-stack capstone project focused on building a calm, accessible visual routine and task sequencing application. The app is designed to help users create, organise, and follow step-by-step routines in a clear, supportive, and neurodivergent-friendly way.

Bloom currently focuses on **Bloom Personal**, a personal routine, focus, and task support app. The current version is being prepared for public beta feedback with a public Overview page, login modal flow, accessibility page controls, visual identity polish, and gentle feedback collection.

すべての人にやさしい、落ち着いたルーティン管理アプリ。

Bloomは、視覚的なルーティン作成とタスク進行を支援するアクセシビリティ重視のフルスタック・キャップストーンプロジェクトです。ユーザーがステップごとのルーティンを分かりやすく作成・整理・実行できるように設計しており、ニューロダイバージェントフレンドリーな体験を重視しています。

現在は、個人利用向けの **Bloom Personal** を中心に開発しています。現バージョンでは、公開用Overviewページ、ログインモーダル、アクセシビリティ用Page Controls、ビジュアルデザインの改善、ベータフィードバック収集に向けた調整を進めています。

## Live Demo

Click here to: [Experience Bloom](https://bloom-app-three-xi.vercel.app/)

### Beta Preview Note

Bloom is currently in a beta/frontend polish phase. A demo mode has been added so testers and reviewers can explore the app with sample data before account creation is fully available.

Recent beta updates include the improved login modal, demo mode access, exit demo confirmation, cleaner mobile reminder layout, sidebar reminder placement, and protected-app layout polish.

Full account creation and onboarding are planned for a later full-stack version.

## Screenshots / スクリーンショット

<table>
  <tr>
    <td>
      <img src="./public/bloom_overview.png" width="400"/>
      <br/>
      <strong>Public Overview / 公開概要ページ</strong>
    </td>
    <td>
      <img src="./public/bloom-login-modal.png" width="400"/>
      <br/>
      <strong>Login Modal / ログインモーダル</strong>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./public/bloom-page-controls.png" width="400"/>
      <br/>
      <strong>Page Controls / ページ表示設定</strong>
    </td>
    <td>
      <img src="./public/bloom_home.png" width="400"/>
      <br/>
      <strong>Home / ホーム</strong>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./public/bloom_routines.png" width="400"/>
      <br/>
      <strong>Routines / ルーティン</strong>
    </td>
    <td>
      <img src="./public/bloom_focus.png" width="400"/>
      <br/>
      <strong>Focus / フォーカス</strong>
    </td>
  </tr>
</table>

## Current Status / 現在のステータス

### v1.6.1 - Visual Identity & Public Beta Polish

* Added a public Overview page as the main landing page for logged-out users.
* Replaced the separate login page with a login modal overlay.
* Added public About, Privacy, and Accessibility pages.
* Updated the Header with public navigation links for Overview, About, and Feedback.
* Added a feedback section with a Google feedback form link for beta testing.
* Added a Page Controls dropdown in the Header using a slider SVG icon.
* Made OpenDyslexic and text size controls available before login.
* Added text size options from S to XL in the public Page Controls menu.
* Added click-outside and Escape key support for closing the Page Controls dropdown.
* Added the Bloom illustration to the public Overview hero section.
* Added subtle floral and botanical desktop background decoration inspired by the Bloom illustration.
* Tuned dark mode decoration opacity so the interface remains readable and calm.
* Updated the roadmap section to show v1.4, v1.5, v1.6, and v1.6.1 with short explanations.
* Continued preparing Bloom for public beta feedback and future v2.0.0 backend foundation work.

### v1.6.1 - ビジュアルデザインと公開ベータ準備

* 未ログインユーザー向けに、公開用Overviewページをメインのランディングページとして追加。
* 独立したログインページを、Overviewページ上に表示されるログインモーダルへ変更。
* 公開用の About、Privacy、Accessibility ページを追加。
* Header に Overview、About、Feedback の公開ナビゲーションリンクを追加。
* ベータテスト用に、Googleフィードバックフォームへつながるフィードバックセクションを追加。
* Header にスライダーSVGアイコンを使った Page Controls ドロップダウンを追加。
* ログイン前でも OpenDyslexic と文字サイズ設定を利用できるように改善。
* Page Controls に S、M、L、XL の文字サイズ設定を追加。
* Page Controls ドロップダウンに、外側クリックと Escape キーで閉じる動作を追加。
* 公開Overviewページのヒーローエリアに Bloom イラストを追加。
* Bloom イラストの雰囲気に合わせて、デスクトップ用の花・植物の背景装飾を追加。
* ダークモードで装飾が強くなりすぎないように透明度を調整。
* ロードマップを v1.4、v1.5、v1.6、v1.6.1 の説明付き表示へ更新。
* 公開ベータフィードバックと将来の v2.0.0 バックエンド開発に向けた準備を継続。

## Project Overview / プロジェクト概要

Bloom is being built as a web-first visual task sequencer and routine builder. The first version focuses on **Bloom Personal**, a personal-use routine app with accessible layouts, task cards, routine pages, progress tracking and multiple user modes.

The long-term vision is **Bloom Education**, which may expand the app into an educational platform for students, parents, teachers, and school administrators. This education phase is planned for the future after the personal version is complete and stable.

Bloomは、Webファーストの視覚的タスクシーケンサーおよびルーティンビルダーとして開発しています。最初のバージョンでは、個人利用向けの **Bloom Personal** に集中し、アクセシブルなレイアウト、タスクカード、ルーティンページ、進捗管理、複数の利用モードを構築していきます。

長期的には、学生、保護者、教師、学校管理者向けの教育プラットフォームである **Bloom Education** への拡張も視野に入れています。この教育向けフェーズは、個人版が安定した後の将来的な計画です。

## Core Goals / 主な目標

| EN | 日本語 |
|---|---|
| Build a calm and accessible routine-building app | 落ち着いて使えるアクセシブルなルーティン作成アプリを構築 |
| Support neurodivergent-friendly user experiences | ニューロダイバージェントフレンドリーなユーザー体験を支援 |
| Provide simple visual step-by-step task guidance | ステップごとの視覚的なタスク案内を提供 |
| Include kid-friendly and adult-friendly modes | 子ども向け・大人向けのモードに対応 |
| Design layouts that work well on desktop and mobile | デスクトップとモバイルの両方で使いやすいレイアウトを設計 |
| Build a strong portfolio-ready full-stack capstone project | ポートフォリオに掲載できるフルスタック・キャップストーンとして成長させる |

## Current Features / 現在の機能

| EN | 日本語 | EN | 日本語 |
|---|---|---|---|
| Desktop sidebar and Mobile bottom navigation | デスクトップ用サイドバーナビゲーション/モバイル用ボトムナビゲーション | Empty state microcopy improvements | 空状態メッセージの改善 |
| Reusable Bloom button components | 再利用可能なBloomボタンコンポーネント | Public Overview landing page | 公開用Overviewランディングページ |
| Task card and task list components | タスクカード・タスクリストコンポーネント | Login modal overlay | ログインモーダル表示 |
| Emoji picker for new and edited tasks | 新規作成・編集タスク用の絵文字ピッカー | Public About, Privacy, and Accessibility pages | 公開用 About / Privacy / Accessibility ページ |
| Completed task styling with tick and line-through state | チェック表示と取り消し線による完了タスク表示 | Google feedback form link for beta feedback | ベータフィードバック用Googleフォームリンク |
| Selectable demo routine preview | 選択可能なデモルーティンプレビュー | Header Page Controls dropdown | Header の Page Controls ドロップダウン |
| Load selected demo routines only | 選択したデモルーティンのみ読み込み | Text size controls from S to XL | S〜XL の文字サイズ設定 |
| Global app context structure | グローバルアプリコンテキスト構成 | Light and dark mode | ライトモード・ダークモード |
| Reusable UI component folder | 再利用可能なUIコンポーネントフォルダ | OpenDyslexic font, Reduce motion toggle | OpenDyslexicフォント切り替え /アニメーション軽減設定|
| Reusable empty state component | 再利用可能な空状態コンポーネント | Daily reset behaviour for tasks, routines, routine steps and focus tasks | タスク、ルーティン、ルーティンステップ、集中タスクの日次リセット |

## Pages / ページ構成

| Page | Purpose | ページ | 目的 |
|---|---|---|---|
| Overview | Public landing page for Bloom, beta information, visual identity, roadmap and feedback link | 概要 | Bloomの公開ランディングページ、ベータ情報、ビジュアル方向性、ロードマップ、フィードバックリンク |
| Home | Today’s focus, task list, task completion and daily reminder | ホーム | 今日のフォーカス、タスクリスト、タスク完了、デイリーリマインダー |
| Routines | Routine builder, routine steps and selectable demo routines | ルーティン | ルーティン作成、ステップ管理、選択可能なデモルーティン |
| Focus | Daily focus task tracking | フォーカス | 日々の集中タスク管理 |
| Progress | Calm progress overview and weekly snapshots | プログレス | 落ち着いた進捗概要と週間スナップショット |
| Moments | Future page for gentle wins, reflections and non-gamified progress moments | モーメンツ | 小さな達成、振り返り、非ゲーム的な進捗確認用の将来ページ |
| Profile | User settings and accessibility preferences | プロフィール | ユーザー設定とアクセシビリティ設定 |

Additonal pages:
* About - Deeper explanation of Bloom’s purpose, design goals and beta direction / Bloomの目的、デザイン方針、ベータ段階の説明 |
* Privacy - Public privacy and data handling information / プライバシーとデータ取り扱いに関する公開情報 |
* Accessibility - Public accessibility and usability information / アクセシビリティと使いやすさに関する公開情報 |

## Planned Features / 今後の予定機能

| EN | 日本語 |
|---|---|
| Onboarding flow | オンボーディングフロー |
| Mood check-in at app open | アプリ起動時の気分チェックイン |
| Short version of routines | ルーティンの短縮版 |
| Oasis calm reset space | Oasis という落ち着いたリセット空間 |
| Moments view for small wins and gentle reflections | 小さな達成や振り返りを表示する Moments ビュー |
| Time estimates per routine step | ルーティンステップごとの所要時間目安 |
| Missed-day recovery wording | できなかった日の回復を支えるメッセージ |
| Low demand mode | 低負荷モード |
| Notification/reminder setting | 通知・リマインダー設定 |
| Exportable progress CSV | 進捗CSVエクスポート |
| Dedicated in-app Feedback page | 専用のアプリ内フィードバックページ |
| Feedback form that sends directly to the Bloom email through a backend or serverless function | バックエンドまたはサーバーレス関数を通してBloomメールへ送信するフィードバックフォーム |
| Ambient audio toggle | 環境音の切り替え |
| High contrast display option | 高コントラスト表示オプション |
| Reduced motion improvements | アニメーション軽減の改善 |
| Helper label / ARIA support options | ヘルパーラベル・ARIAサポート設定 |
| Persisted user accessibility preferences | ユーザーごとのアクセシビリティ設定保存 |
| v2.0.0 full-stack backend with authentication and database persistence | 認証とデータベース永続化を含む v2.0.0 フルスタックバックエンド |
| Future full-stack deployment | 将来的なフルスタックデプロイ |

## App Modes / アプリモード

| Mode | Purpose | モード | 目的 |
|---|---|---|---|
| Standard Mode | Clean adult-friendly layout for personal routines | スタンダードモード | 個人ルーティン向けのシンプルで大人向けのレイアウト |
| Kid Mode | Simplified, warmer, emoji-heavy experience for children | キッズモード | 子ども向けの分かりやすく温かい絵文字中心のUI |
| Focus Mode | One step shown at a time to reduce distraction | フォーカスモード | 気が散りにくいように1ステップずつ表示 |
| Calm Mode | Softer interface with reduced motion and urgency | リラックスモード | 動きや緊急感を抑えた落ち着いたUI |
| Review Mode | Reflection after completing a routine | レビューモード | ルーティン完了後の振り返り |
| Education Mode | Long-term future mode for school-based use | 学習・学校モード | 将来的な学校・教育向け利用モード |

## Tech Stack / 技術スタック

### Current Frontend / 現在のフロントエンド

- React
- JavaScript
- Tailwind CSS
- Vite
- Vercel
- Git/GitHub

## Author
Built by Iris408
