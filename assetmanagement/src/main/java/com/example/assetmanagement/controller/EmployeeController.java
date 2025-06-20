package com.example.assetmanagement.controller;

import com.example.assetmanagement.dto.LoginDto;
import com.example.assetmanagement.model.Employee;

import com.example.assetmanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;

	@GetMapping
	public List<Employee> getAllEmployees() {
		return employeeService.getAllEmployees();
	}

	@PostMapping("/user/login")
	public ResponseEntity<?> UserLogin(@RequestBody LoginDto employee) {

		Employee e = employeeService.userLogin(employee);

		if (e != null)
			return ResponseEntity.status(HttpStatus.OK).body(e);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email or Password Invalid");

	}

	

	@GetMapping("/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer id) {
		Optional<Employee> employee = employeeService.getEmployeeById(id);
		return employee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeService.createEmployee(employee);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody Employee employee) {
		Employee updatedEmployee = employeeService.updateEmployee(id, employee);
		return updatedEmployee != null ? ResponseEntity.ok(updatedEmployee) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable Integer id) {
		employeeService.deleteEmployee(id);
		return ResponseEntity.noContent().build();
	}
}