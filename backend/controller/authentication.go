package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"
	"github.com/B6025212/team05/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type AdminLoginPayload struct {
	Admin_ID       string `json:"admin_id"`
	Admin_Password string `json:"admin_password"`
}

// SignUpPayload signup body
type AdminSignUpPayload struct {
	Admin_ID       string `json:"admin_id" valid:"required~Admin_ID cannot be blank"`
	Admin_Password string `json:"admin_password" valid:"required~Password cannot be blank"`
}

// LoginResponse token response
type LoginResponse struct {
	Admin_Token string `json:"admin_token"`
	Admin_ID    string `json:"admin_id"`
}

// POST /login
func Login(c *gin.Context) {
	var payload AdminLoginPayload
	var admin entity.Admin

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM admins WHERE email = ?", payload.Admin_ID).Scan(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(admin.Admin_Password), []byte(payload.Admin_Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

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
		Admin_Token: signedToken,
		Admin_ID:    admin.Admin_ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// // POST /create
// func Creat(c *gin.Context) {
// 	var payload SignUpPayload
// 	var user entity.User

// 	if err := c.ShouldBindJSON(&payload); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// แทรกการ validate ไว้ช่วงนี้ของ controller
// 	if _, err := govalidator.ValidateStruct(payload); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
// 	hashPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
// 		return
// 	}

// 	user.Name = payload.Name
// 	user.Email = payload.Email
// 	user.Password = string(hashPassword)
// 	user.Role = payload.Role

// 	if err := entity.DB().Create(&user).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"data": user})
// }
