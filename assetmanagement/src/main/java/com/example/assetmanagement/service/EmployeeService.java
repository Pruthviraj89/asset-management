package com.example.assetmanagement.service;

import com.example.assetmanagement.dto.LoginDto;
import com.example.assetmanagement.model.EmpRole;
import com.example.assetmanagement.model.Employee;
import com.example.assetmanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Integer id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
    	
    	employee.setPassword(passwordEncoder.encode(employee.getPassword()));
    	
        return employeeRepository.save(employee);
    }
    
    public Employee userLogin(LoginDto employee) {
    	
    	Employee userE=employeeRepository.findByEmail(employee.getEmail());
    	
    	
    	if(userE!=null) {
    		if(passwordEncoder.matches(employee.getPassword(), userE.getPassword()))
    			return userE;
    			
    	}
    	return null;
    	
    }
    
    

    
    

    public Employee updateEmployee(Integer id, Employee updatedEmployee) {
        Optional<Employee> existingEmployee = employeeRepository.findById(id);
        if (existingEmployee.isPresent()) {
            Employee employee = existingEmployee.get();
            employee.setFirstName(updatedEmployee.getFirstName());
            employee.setLastName(updatedEmployee.getLastName());
            employee.setEmail(updatedEmployee.getEmail());
            employee.setDepartment(updatedEmployee.getDepartment());
            return employeeRepository.save(employee);
        }
        return null;
    }

    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }
}