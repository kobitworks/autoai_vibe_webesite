# VCL-G001 — STARTUP SEVEN

## 概要
Vibe Coding Labの孫プロジェクト「Sample 1」です。  
7ターンで資金・信頼・開発進捗を伸ばし、小さな事業を軌道に乗せる軽量な経営シミュレーション風Web PoCです。

## 孫プロジェクトID
- VCL-G001

## 名称
- STARTUP SEVEN

## 目的
HTML / CSS / Vanilla JavaScriptだけで、ゲームらしい操作感を持つ小規模Webアプリを短いサイクルで構築できることを確認する。

## 想定ユーザー
- Vibe Coding LabのPoC閲覧者
- 軽量なゲーム風UIのサンプルを確認したい人

## 主要操作
- 営業する
- 開発する
- 広報する
- 休息する
- 7ターン終了時のCLEAR / TRY AGAIN判定
- ゲーム状態のリセット

## 画面・機能
- TURN / 資金 / 信頼 / 開発 / 体力のHUD
- CLEAR条件の進捗表示
- 4種類の行動コマンド
- 会社状態・TACTICAL NOTE
- ターンイベントとイベントログ
- 結果モーダル
- PC / スマートフォン向けレスポンシブ

## CLEAR条件
7ターン終了時に以下をすべて満たすこと。
- 資金 180万円以上
- 信頼 60以上
- 開発 75%以上

## 使用技術
- HTML
- CSS
- Vanilla JavaScript
- 外部API / DB / 認証なし

## PoC公開URL
- https://kobitworks.github.io/autoai_vibe_webesite/projects/sample1/

## GitHub
- https://github.com/kobitworks/autoai_vibe_webesite/tree/autoai/vcl-005-sample1-game/projects/sample1

## 現在のステータス
- poc

## 既知の制約・未対応
- サンプルデータのみ
- 状態はブラウザへ永続保存しない
- 音声、DB、ログイン、外部APIは未使用
- ポータル一覧登録はVCL-006で実施
- GitHub Pages上の統合導線確認はVCL-007で実施

## 変更履歴
- 2026-10-01: VCL-005で企業サイト風Sample 1を経営シミュレーション風PoCへ全面更新。VCL-G001を付与し、README / project.jsonを追加。
