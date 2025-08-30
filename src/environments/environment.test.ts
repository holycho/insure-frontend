const devEnvConstants = {
  browser: {
    useMsw: true,
  },
  backend: {
    domainName: 'http://localhost:3000',
    resources: {
      api: '/api',
      // images: '/images',
      images: '/assets/img',
      pdf: '/pdf'
    },
    api: {
      // 依規格書 API 規則分類
      modules: {
        // 頁面文案模組
        fesrc: '/fesrc',
        // SSO 模組
        aauthserv: '/aauthserv',
        // 系統設定模組
        sysmgmt: '/sysmgmt',
        // 共用模組
        uniserv: '/uniserv',
        // 會員模組
        femem: '/femem',
        // 核心商品模組
        coreprod: '/coreprod',
        // 保單模組
        insuserv: '/insuserv'
      }
    },
    headers: {
      sessionId: 'SessionId',
      authorization: {
        prefix: 'Bearer'
      }
    }
  }
};

export default devEnvConstants;
