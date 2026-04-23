---
name: vtuber-front 快速審查修正計畫
overview: 依你指定的快速全域掃描，我先鎖定高風險的安全與穩定性問題，再補上建置/測試基線，讓專案可持續維護。此計畫不改功能範圍，優先降低風險與提升開發品質。
todos:
  - id: sanitize-html-paths
    content: 為所有 `v-html` 路徑加入內容淨化策略（至少前端保護，建議同時後端白名單 sanitize）
    status: pending
  - id: harden-axios-errors
    content: 抽出統一錯誤解析 helper/interceptor，替換 `error.response.data` 直取模式
    status: pending
  - id: remove-full-reload
    content: 把 admin 的 `window.location.reload(true)` 改為局部狀態更新或重抓單一資料源
    status: completed
  - id: secure-blank-links
    content: 補齊所有 `target="_blank"` 的 `rel="noopener noreferrer"`
    status: completed
  - id: add-quality-gates
    content: 在 `package.json` 加入 `lint/typecheck/test` scripts，並新增最小 CI workflow
    status: pending
  - id: fix-pagination-typo
    content: 修正 `components/nav/pagination.vue` 的 `defaulut` typo 並確認 pagination 顯示數值邏輯
    status: pending
isProject: false
---

# vtuber-front 快速審查修正計畫

## 目標
- 優先修掉高風險問題（XSS、錯誤處理崩潰）。
- 移除會造成 UX 與效能退化的模式（整頁 reload、請求瀑布）。
- 補齊最小可行的品質守門（lint/typecheck/test/CI）。

## 主要發現（已驗證）
- `v-html` 直接渲染內容，存在 XSS 風險：
  - [D:/21WEB/projects/vtuber-front/pages/articles/[category]/[subcategory]/[slug].vue](D:/21WEB/projects/vtuber-front/pages/articles/[category]/[subcategory]/[slug].vue)
  - [D:/21WEB/projects/vtuber-front/pages/articles/featured.vue](D:/21WEB/projects/vtuber-front/pages/articles/featured.vue)
  - [D:/21WEB/projects/vtuber-front/pages/admin/featured.vue](D:/21WEB/projects/vtuber-front/pages/admin/featured.vue)
- 多處 `catch` 直接讀 `error.response.data`，遇到網路錯誤可能二次崩潰：
  - [D:/21WEB/projects/vtuber-front/pages/admin/index.vue](D:/21WEB/projects/vtuber-front/pages/admin/index.vue)
  - [D:/21WEB/projects/vtuber-front/pages/admin/articles/index.vue](D:/21WEB/projects/vtuber-front/pages/admin/articles/index.vue)
- 後台大量 `window.location.reload(true)`，造成體驗與效能負擔：
  - [D:/21WEB/projects/vtuber-front/pages/admin](D:/21WEB/projects/vtuber-front/pages/admin)
- 多處 `target="_blank"` 未加 `rel="noopener noreferrer"`：
  - [D:/21WEB/projects/vtuber-front/pages/index.vue](D:/21WEB/projects/vtuber-front/pages/index.vue)
  - [D:/21WEB/projects/vtuber-front/pages/livestreams.vue](D:/21WEB/projects/vtuber-front/pages/livestreams.vue)
  - [D:/21WEB/projects/vtuber-front/pages/rankings](D:/21WEB/projects/vtuber-front/pages/rankings)
- 品質基線不足：`package.json` 無 `lint/test/typecheck` script，且未見 CI workflow。
  - [D:/21WEB/projects/vtuber-front/package.json](D:/21WEB/projects/vtuber-front/package.json)
- 低風險 typo：pagination prop `defaulut`。
  - [D:/21WEB/projects/vtuber-front/components/nav/pagination.vue](D:/21WEB/projects/vtuber-front/components/nav/pagination.vue)

## 執行順序
1. 先做安全與穩定性（不改 UI 行為）：XSS 防護、錯誤處理防呆。
2. 再做體驗/效能：移除整頁 reload、改局部刷新；平行化可獨立 API 請求。
3. 最後補工程守門：lint + typecheck + test + CI。

## 驗收標準
- 不再出現未防護的 `v-html` 渲染路徑（有 sanitize 或改安全渲染策略）。
- 所有 API 錯誤處理在 `error.response` 缺失時不拋例外。
- 後台 CRUD 後不再使用 `window.location.reload(true)`。
- 所有外連新分頁具備 `rel="noopener noreferrer"`。
- 可在 CI 上跑通 `lint`、`typecheck`、`test`、`build`。
