package com.example.assetmanagement.repository;

import com.example.assetmanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	
	Employee findByEmail(String email);
}