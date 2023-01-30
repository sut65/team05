package service

import (
	"errors"

	jwt "github.com/golang-jwt/jwt/v4"
)

// JwtWrapper wraps the signing key and the issuer
type Student_JwtWrapper struct {
	SecretKey       string
	Issuer          string
	ExpirationHours int64
}

// JwtClaim adds std_id as a claim to the token
type Student_JwtClaim struct {
	Student_ID string
	jwt.RegisteredClaims
}

// Generate Token generates a jwt token
func (j *Student_JwtWrapper) GenerateStudentToken(student_id string) (signedToken string, err error) {
	claims := &Student_JwtClaim{
		Student_ID: student_id,
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
func (j *Student_JwtWrapper) ValidateStudentToken(signedToken string) (claims *Student_JwtClaim, err error) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&Student_JwtClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(j.SecretKey), nil
		},
	)

	if err != nil {
		return
	}

	claims, ok := token.Claims.(*Student_JwtClaim)
	if !ok {
		err = errors.New("couldn't parse claims")
		return
	}
	return
}
