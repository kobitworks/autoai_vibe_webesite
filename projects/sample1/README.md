# VCL-G001 — STARTUP SEVEN

## 概要
Vibe Coding Labの孫プロジェクト「Sample 1」です。  
7ターンで開発スタジオを運営し、開発進捗100%を目指す軽量な経営シミュレーション風Web PoCです。

## 孫プロジェクトID
- VCL-G001

## 名称
- STARTUP SEVEN

## 目的
HTML / CSS / Vanilla JavaScriptだけで、ゲームらしい操作感を持つ小規模Webアプリを短いサイクルで構築できることを確認する。

## 想定ユーザー
- Vibe Coding LabのPoC閲覧者
- 軽量なゲーム風UIのサンプルを確認したい人

## 初期状態
- ターン: 1 / 7
- 資金: 100万円
- 信頼: 50
- 開発進捗: 0%
- 体力: 100%

## 主要操作
- 営業する: 資金 +25 / 信頼 +8 / 体力 -15
- 開発する: 開発 +25 / 体力 -22
- 広報する: 資金 -10 / 信頼 +14 / 体力 -8
- 休息する: 体力 +28
- 各操作後にターンが1進む
- ゲーム状態をリセットできる

## 画面・機能
- TURN / 資金 / 信頼 / 開発 / 体力のHUD
- ミッションと開発進捗バー
- 4種類のコマンド選択
- 会社ステータスとTACTICAL NOTE
- 直近5件のイベントログ
- 7ターン終了時のCLEAR / TRY AGAIN判定
- PC / スマートフォン向けレスポンシブ

## CLEAR条件
7ターン終了時に開発進捗100%以上を達成すること。

資金・信頼・体力は補助指標で、初期PoCでは極端なマイナス等による追加の失敗条件は設けない。

## 使用技術
- HTML
- CSS
- Vanilla JavaScript
- 外部API / DB / 認証なし

## PoC公開URL
- https://kobitworks.github.io/autoai_vibe_webesite/projects/sample1/

## GitHub
- https://github.com/kobitworks/autoai_vibe_webesite/tree/main/projects/sample1

## 現在のステータス
- poc

## 既知の制約・未対応
- サンプルデータのみ
- 状態はブラウザへ永続保存しない
- 音声、DB、ログイン、外部APIは未使用
- VCL-G001のポータル一覧登録は完了
- GitHub Pages上の統合導線確認はVCL-007で実施

## 変更履歴
- 2026-10-04: VCL-006でproject.jsonとルートprojects.jsを同期し、Vibe Coding LabポータルへVCL-G001を登録。
- 2026-10-04: VCL-005を再開し、index.html / style.css / app.js をSTARTUP SEVEN実装へ置換。VCL-004正本に合わせCLEAR条件を開発進捗100%へ同期。
- 2026-10-01: VCL-G001を付与し、README / project.jsonを追加。
