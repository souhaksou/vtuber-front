---
name: vtuber-front 深度審查修正計畫（2026-04）
overview: 基於上一份計畫（`vtuber-front_快速審查修正計畫_ebb87770.plan.md`，所有項目已完成）的後續深度審查。本版改為與快速審查相同格式，方便在 Cursor 直接追蹤勾選狀態。
todos:
  - id: c1-import-missing-vue-extension
    content: C1｜Import 缺少 `.vue` 副檔名
    status: completed
  - id: c2-array-index-boundary-check
    content: C2｜陣列未做邊界檢查就存取 `[0]`
    status: completed
  - id: c3-onmounted-async-ref-access
    content: C3｜`onMounted` 存取尚未非同步填充的 ref
    status: completed
  - id: h1-json-parse-without-try-catch
    content: H1｜裸 `JSON.parse` 無 try-catch
    status: completed
  - id: h2-usefetch-silent-error
    content: H2｜`useFetch` 失敗時靜默無提示
    status: completed
  - id: h3-token-null-check
    content: H3｜`localStorage.getItem('token')` 未做 null 檢查
    status: completed
  - id: h4-changecss-race-condition
    content: H4｜`changeCss` 在資料載入前就執行（Race Condition）
    status: completed
  - id: m1-parseapierror-no-errormsg
    content: M1｜admin 頁面引入 `parseApiError` 但未引入 `errorMsg`
    status: completed
  - id: m2-modal-duplicate-validation
    content: M2｜Modal 新增模式缺少重複項目驗證
    status: completed
  - id: m3-token-in-localstorage
    content: M3｜Token 存在 localStorage（XSS 風險）
    status: pending
  - id: m4-admin-error-handling-inconsistent
    content: M4｜各 admin 頁面錯誤處理模式不一致
    status: completed
  - id: m5-deepcopy-special-types
    content: M5｜`deepCopy` 不支援 Date/Map/Set/循環引用
    status: completed
  - id: m6-usetime-empty-array
    content: M6｜`useTime.js` 不驗證空陣列
    status: completed
  - id: l1-hardcoded-github-api-url
    content: L1｜GitHub API URL 硬寫在多個頁面
    status: pending
  - id: l2-external-api-no-timeout
    content: L2｜外部 API 呼叫無 timeout 設定
    status: pending
  - id: l3-seo-fetch-fallback-meta
    content: L3｜SEO fetch 失敗時 meta tag 完全缺失
    status: pending
  - id: l4-livecurrent-invalid-index
    content: L4｜`liveCurrent()` 回傳 undefined/-1 時分頁計算錯誤
    status: pending
  - id: l5-usecheck-empty-string
    content: L5｜`useCheck.js` 回傳空字串導致「0 vs 無資料」混淆
    status: pending
  - id: l6-missing-loading-state
    content: L6｜所有資料頁面缺少 Loading 狀態
    status: pending
  - id: l7-missing-security-headers
    content: L7｜nuxt.config.ts 缺少安全 Header 設定
    status: pending
  - id: l8-public-runtimeconfig-api-base-url
    content: L8｜`API_BASE_URL` 暴露在 client-side runtimeConfig
    status: pending
isProject: false
---

# vtuber-front 深度審查修正計畫（2026-04）

> 基於上一份計畫（`vtuber-front_快速審查修正計畫_ebb87770.plan.md`，所有項目已完成）的後續深度審查。  
> 勾選請直接更新上方 `todos` 的 `status`。

---

## 嚴重 (Critical) — 必須優先處理

- **C1｜Import 缺少 `.vue` 副檔名**
  - 檔案：`pages/admin/home/articles.vue:4`
  - 問題：`import activeArticleModal from '@/components/modal/activeArticleModal'` 缺 `.vue`，部分建置環境會解析失敗
  - 修法：加上 `.vue` 副檔名

- **C2｜陣列未做邊界檢查就存取 `[0]`**
  - 檔案：`pages/articles/featured.vue:30`、`pages/admin/featured.vue:35`
  - 問題：`changeCss(container.value[0])` 在陣列為空時直接 crash
  - 修法：加上 `if (container.value?.length) { changeCss(container.value[0]) }`

- **C3｜`onMounted` 存取尚未非同步填充的 ref**
  - 檔案：`pages/articles/featured.vue:29-31`、`pages/admin/featured.vue:34-35`
  - 問題：`container.value` 由 `useFetch` 非同步填入，`onMounted` 時可能仍為空
  - 修法：改在 `watch(container, ...)` 或 `nextTick` 後呼叫 `changeCss`

---

## 高 (High) — 本週內處理

- **H1｜裸 `JSON.parse` 無 try-catch**
  - 檔案：`pages/livestreams.vue:35`、`pages/index.vue:12,20,28`、`pages/rankings/follow.vue:35`、`pages/rankings/index.vue:35`
  - 問題：API 回傳非預期格式時整頁 crash
  - 修法：用 try-catch 包裹，catch 裡設定 fallback 空值並顯示錯誤提示

- **H2｜`useFetch` 失敗時靜默無提示**
  - 檔案：`pages/livestreams.vue`、`pages/rankings/index.vue`、`pages/rankings/follow.vue`、`pages/articles/featured.vue`、`pages/charts.vue`、`pages/index.vue`、`pages/articles/index.vue`
  - 問題：status 非 success 時，使用者無法分辨「真的沒資料」還是「請求失敗」
  - 修法：在 status === 'error' 時顯示錯誤訊息或 toast

- **H3｜`localStorage.getItem('token')` 未做 null 檢查**
  - 檔案：`pages/admin/index.vue:15`、`pages/admin/articles/index.vue:11`、`pages/admin/charts.vue:15`（及其他 admin 頁面）
  - 問題：token 不存在時，API 請求 header 帶 `null`，請求必然失敗
  - 修法：取得 token 後立即判斷，null 時導回登入頁或提早 return

- **H4｜`changeCss` 在資料載入前就執行（Race Condition）**
  - 檔案：`pages/articles/featured.vue`、`pages/admin/featured.vue`
  - 問題：DOM 更新尚未完成，CSS 操作對象不存在
  - 修法：改用 `watch` 監聽資料完成後，再搭配 `nextTick` 執行 CSS

---

## 中 (Medium) — 兩週內處理

- **M1｜admin 頁面引入 `parseApiError` 但未引入 `errorMsg`**
  - 檔案：`pages/admin/featured.vue`、`pages/admin/home/charts.vue`
  - 問題：API 錯誤被解析但沒有顯示給使用者，靜默失敗
  - 修法：補上 `errorMsg` 引入，或統一改用 composable 封裝錯誤顯示

- **M2｜Modal 新增模式缺少重複項目驗證**
  - 檔案：`components/modal/tagModal.vue:40`
  - 問題：重複檢查邏輯同時作用於 add/edit，導致 edit 同名時誤報
  - 修法：將重複檢查限定在 `props.type === 'add'` 的分支內

- **M3｜Token 存在 localStorage（XSS 風險）**
  - 檔案：`pages/login.vue:54-55`、`middleware/auth.global.js`
  - 問題：任何 XSS 漏洞都能偷走 token；localStorage 對頁面所有 JS 可見
  - 修法：評估改用 httpOnly cookie（需後端配合）；短期至少加 Content-Security-Policy

- **M4｜各 admin 頁面錯誤處理模式不一致**
  - 問題：有些 catch 不 show modal、有些直接 ignore，維護困難
  - 修法：統一用一個 `useAdminError()` composable 處理所有 admin 頁面的錯誤顯示

- **M5｜`deepCopy` 不支援 Date/Map/Set/循環引用**
  - 檔案：`utils/useCopy.js`
  - 問題：複製特殊物件時結果不正確
  - 修法：改用 `structuredClone()`（現代瀏覽器原生支援）

- **M6｜`useTime.js` 不驗證空陣列**
  - 檔案：`utils/useTime.js`
  - 問題：`live3()`、`liveCurrent()` 傳入空陣列時邏輯出錯
  - 修法：函式入口加上 `if (!data?.length) return null`

---

## 低 (Low) — 有空再處理

- **L1｜GitHub API URL 硬寫在多個頁面**
  - 檔案：`pages/index.vue`、`pages/livestreams.vue`、`pages/rankings/index.vue`、`pages/rankings/follow.vue`
  - 問題：搬移 repo 或調整路徑要改多處
  - 修法：抽成 `composables/useGithubApi.js` 或寫入 `nuxt.config.ts` runtimeConfig

- **L2｜外部 API 呼叫無 timeout 設定**
  - 問題：GitHub API 掛掉時頁面無限等待
  - 修法：`useFetch` 加上 `timeout` 選項，或包裝一個帶預設 timeout 的 fetch helper

- **L3｜SEO fetch 失敗時 meta tag 完全缺失**
  - 檔案：`pages/articles/featured.vue:44-66`、`pages/rankings/index.vue:48-71` 等
  - 問題：fetch 失敗時 `useHead` 未呼叫，頁面無 title/meta
  - 修法：加上 fallback `useHead`，至少填入預設 title

- **L4｜`liveCurrent()` 回傳 undefined/-1 時分頁計算錯誤**
  - 檔案：`pages/livestreams.vue:38-40`
  - 問題：`index` 為負數或 NaN 時分頁跳到錯誤頁
  - 修法：對 `liveCurrent()` 回傳值加 `Math.max(0, ...)` 防呆

- **L5｜`useCheck.js` 回傳空字串導致「0 vs 無資料」混淆**
  - 檔案：`utils/useCheck.js:16-33`
  - 問題：呼叫端無法區分 0 追蹤數與資料缺失
  - 修法：改回傳 `null` 代表缺失，`0` 代表真的是 0

- **L6｜所有資料頁面缺少 Loading 狀態**
  - 問題：資料載入中時使用者看到空白頁，體驗差
  - 修法：利用 `useFetch` 回傳的 `pending` ref 顯示 skeleton 或 spinner

- **L7｜nuxt.config.ts 缺少安全 Header 設定**
  - 問題：無 CSP、X-Frame-Options、X-Content-Type-Options
  - 修法：安裝 `nuxt-security` 模組或手動在 `nitro.routeRules` 加入 header

- **L8｜`API_BASE_URL` 暴露在 client-side runtimeConfig**
  - 檔案：`nuxt.config.ts:33`
  - 問題：API 端點對外可見，攻擊者可直接呼叫後端
  - 修法：若只供 server 使用，移到 `runtimeConfig`（非 `public`）區塊

---

## 進度統計

| 嚴重度 | 總數 | 已完成 | 待處理 |
|--------|------|--------|--------|
| Critical | 3 | 3 | 0 |
| High | 4 | 4 | 0 |
| Medium | 6 | 5 | 1 |
| Low | 8 | 0 | 8 |
| **合計** | **21** | **12** | **9** |

---

## 參考：上一份計畫已完成項目

| 項目 | 狀態 |
|------|------|
| 為所有 `v-html` 加入 sanitize | ✅ 完成 |
| 抽出統一錯誤解析 helper/interceptor | ✅ 完成 |
| 移除 `window.location.reload(true)` | ✅ 完成 |
| 補齊 `target="_blank"` 的 `rel="noopener noreferrer"` | ✅ 完成 |
| 加入 lint/typecheck/test scripts 與 CI workflow | ✅ 完成 |
| 修正 pagination `defaulut` typo | ✅ 完成 |
