package entity

import (

  "gorm.io/gorm"

)

// * ====================== Request System ======================

type Approval_Type struct {

  Approval_Type_ID   string `gorm:"primaryKey"`
  Approval_Type_Name      string
  Approval          []Approval `gorm:"foreignKey:Approval_Type_ID"`

}
type Approval struct {

  gorm.Model

  Approval_ID   uint `gorn:"primaryKey"`

  Reason        string 

  Professor_ID   *string 
  Professor      Professor

  Request_ID   *string 
  Request     	Request

  Approval_Type_ID    *string
  Approval_Type       Approval_Type
}