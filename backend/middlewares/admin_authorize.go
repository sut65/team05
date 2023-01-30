package middlewares

import (
	"net/http"
	"strings"

	"github.com/B6025212/team05/service"

	"github.com/gin-gonic/gin"
)

// validates token
func Admin_Authorizes() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("Authorization")
		if clientToken == "" {
			c.JSON(http.StatusForbidden, gin.H{"error": "No Authorization header provided"})
			return
		}

		extractedToken := strings.Split(clientToken, "Bearer ")

		if len(extractedToken) == 2 {
			clientToken = strings.TrimSpace(extractedToken[1])
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect Format of Authorization Token"})
			return
		}

		jwtWrapper := service.Admin_JwtWrapper{
			SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56Ltzaaa",
			Issuer:    "AuthService",
		}

		claims, err := jwtWrapper.ValidateAdminToken(clientToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		c.Set("student_id", claims.Admin_ID)

		c.Next()
	}
}
