	package com.example.assetmanagement.controller;

import com.example.assetmanagement.model.AssetAssignment;
import com.example.assetmanagement.service.AssetAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
public class AssetAssignmentController {
    @Autowired
    private AssetAssignmentService assetAssignmentService;

    @GetMapping
    public List<AssetAssignment> getAllAssignments() {
        return assetAssignmentService.getAllAssignments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetAssignment> getAssignmentById(@PathVariable Integer id) {
        Optional<AssetAssignment> assignment = assetAssignmentService.getAssignmentById(id);
        return assignment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public AssetAssignment createAssignment(@RequestBody AssetAssignment assignment) {
        return assetAssignmentService.createAssignment(assignment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetAssignment> updateAssignment(@PathVariable Integer id, @RequestBody AssetAssignment assignment) {
        AssetAssignment updatedAssignment = assetAssignmentService.updateAssignment(id, assignment);
        return updatedAssignment != null ? ResponseEntity.ok(updatedAssignment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Integer id) {
        assetAssignmentService.deleteAssignment(id);
        return ResponseEntity.noContent().build();
    }
}