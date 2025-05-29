package com.example.assetmanagement.service;

import com.example.assetmanagement.model.AssetAssignment;
import com.example.assetmanagement.repository.AssetAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetAssignmentService {
    @Autowired
    private AssetAssignmentRepository assetAssignmentRepository;

    public List<AssetAssignment> getAllAssignments() {
        return assetAssignmentRepository.findAll();
    }

    public Optional<AssetAssignment> getAssignmentById(Integer id) {
        return assetAssignmentRepository.findById(id);
    }

    public AssetAssignment createAssignment(AssetAssignment assignment) {
        return assetAssignmentRepository.save(assignment);
    }

    public AssetAssignment updateAssignment(Integer id, AssetAssignment updatedAssignment) {
        Optional<AssetAssignment> existingAssignment = assetAssignmentRepository.findById(id);
        if (existingAssignment.isPresent()) {
            AssetAssignment assignment = existingAssignment.get();
            assignment.setAsset(updatedAssignment.getAsset());
            assignment.setEmployee(updatedAssignment.getEmployee());
            assignment.setAssignedDate(updatedAssignment.getAssignedDate());
            assignment.setReturnDate(updatedAssignment.getReturnDate());
            assignment.setNotes(updatedAssignment.getNotes());
            return assetAssignmentRepository.save(assignment);
        }
        return null;
    }

    public void deleteAssignment(Integer id) {
        assetAssignmentRepository.deleteById(id);
    }
}