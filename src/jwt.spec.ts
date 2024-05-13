import { describe, expect, it } from "vitest"
import decodeJWT from "./jwt"

describe('jwt', () => {
    it('can read the value of a jwt', () => {
        const payload = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c;'
        const jwtValue = decodeJWT(payload);
        const expectedJWTVAlue = {
            iat: 1516239022,
            name: "John Doe",
            sub: "1234567890",
          };

        expect(jwtValue).toEqual(expectedJWTVAlue);
    })
})