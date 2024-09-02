from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.utils.token import decode_jwt


class JWTBearer(HTTPBearer):
    def __init__(self, access_level: int = 0, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)
        self.access_level = access_level

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            payload = decode_jwt(jwtoken)
            role = payload.get("sub")
            if self.access_level == 1 and role != "admin":
                raise HTTPException(status_code=401, detail="Have not access")
        except Exception:
            payload = None
        if payload:
            isTokenValid = True

        return isTokenValid
