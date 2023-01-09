package entity

import (

  "gorm.io/gorm"

)

// * ====================== Request System ======================

type Request_Type struct {

  Request_Type_ID   string `gorm:"primaryKey"`
  Request_Type      string
  Request           []Request `gorm:"foreignKey:Request_Type_ID"`

}
type Request struct {

  gorm.Model

  Request_ID   uint `gorn:"primaryKey"`

  Reason        string 

  Student_ID   *string 
  Student       Student

  Subject_ID    *string
  Subject       Subject

  Request_Type_ID    *string
  Request_Type        Request_Type

}