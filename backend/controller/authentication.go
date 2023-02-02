package controller

import (
	"fmt"
	"net/http"

	"github.com/B6025212/team05/entity"
	"github.com/B6025212/team05/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	ID       string `json:"id"`
	Password string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload struct {
	ID       string `json:"id" valid:"required~ID cannot be blank"`
	Password string `json:"password" valid:"required~Password cannot be blank"`
}

// LoginResponse token response
type LoginResponse struct {
	Token    string `json:"token"`
	ID       string `json:"id"`
	UserType string `json:"usertype"`
}

// POST /login
func Login(c *gin.Context) {
	var payload LoginPayload
	var admin entity.Admin
	var student entity.Student
	var professor entity.Professor

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(payload)

	if err := entity.DB().Raw("SELECT * FROM admins WHERE admin_id = ?", payload.ID).Scan(&admin).RowsAffected; err != 0 {
		err := bcrypt.CompareHashAndPassword([]byte(admin.Admin_Password), []byte(payload.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "admin password is incerrect"})
			return
		}

		jwtWrapper := service.Admin_JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateAdminToken(admin.Admin_ID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}

		tokenResponse := LoginResponse{
			Token:    signedToken,
			ID:       admin.Admin_ID,
			UserType: "admin",
		}

		fmt.Println(tokenResponse)

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else if err := entity.DB().Raw("SELECT * FROM students WHERE student_id = ?", payload.ID).Scan(&student).RowsAffected; err != 0 {
		err := bcrypt.CompareHashAndPassword([]byte(student.Student_Password), []byte(payload.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "student password is incerrect"})
			return
		}

		jwtWrapper := service.Student_JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzBVa",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateStudentToken(student.Student_ID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}

		tokenResponse := LoginResponse{
			Token:    signedToken,
			ID:       student.Student_ID,
			UserType: "student",
		}
		fmt.Println(tokenResponse)

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else if err := entity.DB().Raw("SELECT * FROM professors WHERE professor_id = ?", payload.ID).Scan(&professor).RowsAffected; err != 0 {
		err := bcrypt.CompareHashAndPassword([]byte(professor.Professor_password), []byte(payload.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "professor password is incerrect"})
			return
		}

		jwtWrapper := service.Professor_JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFEE",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateProfessorToken(professor.Professor_ID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}

		tokenResponse := LoginResponse{
			Token:    signedToken,
			ID:       professor.Professor_ID,
			UserType: "professor",
		}
		fmt.Println(tokenResponse)

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	}
}
