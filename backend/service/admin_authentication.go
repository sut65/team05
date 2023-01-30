package service

import (
	"errors"

	jwt "github.com/golang-jwt/jwt/v4"
)

// JwtWrapper wraps the signing key and the issuer
type Admin_JwtWrapper struct {
	SecretKey       string
	Issuer          string
	ExpirationHours int64
}

// JwtClaim adds std_id as a claim to the token
type Admin_JwtClaim struct {
	Admin_ID string
	// Role_ID    string
	jwt.RegisteredClaims
}

// Generate Token generates a jwt token
func (j *Admin_JwtWrapper) GenerateAdminToken(admin_id string) (signedToken string, err error) {
	claims := &Admin_JwtClaim{
		Admin_ID: admin_id,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer: j.Issuer,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err = token.SignedString([]byte(j.SecretKey))
	if err != nil {
		return
	}
	return
}

// Validate Token validates the jwt token
func (j *Admin_JwtWrapper) ValidateAdminToken(signedToken string) (claims *Admin_JwtClaim, err error) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&Admin_JwtClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(j.SecretKey), nil
		},
	)

	if err != nil {
		return
	}

	claims, ok := token.Claims.(*Admin_JwtClaim)
	if !ok {
		err = errors.New("couldn't parse claims")
		return
	}
	return
}
