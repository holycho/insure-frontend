import * as jose from 'jose';

/**
 * @description 生成 jwt token
 * @param alg 加密演算法
 * @param payload 加密內容
 * @param signKey 簽章密碼
 */
async function getJwtToken (alg: string, payload: any, signKey: string) {
    const secret = new TextEncoder().encode(signKey);
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .sign(secret);
    return jwt;
}

export default {
  getJwtToken
};
