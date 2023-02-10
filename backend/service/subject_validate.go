package service

import (
	"fmt"

	"github.com/B6025212/team05/entity"
)

func ValidateDuplicateSubject(new_subject entity.Subject) (bool, error) {
	var subjects []entity.Subject
	database := entity.OpenDatabase()

	if tx := database.Where("subject_id = ? AND section = ?", new_subject.Subject_ID, new_subject.Section).Find(&subjects); tx.RowsAffected >= 1 {
		err_message := fmt.Sprintf("Duplicate Subject! There's subject with subject id %s and section %d", new_subject.Subject_ID, new_subject.Section)
		return false, ClassScheduleError{err_message}
	}
	return true, nil
}
