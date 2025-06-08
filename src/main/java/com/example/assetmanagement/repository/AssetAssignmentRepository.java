package com.example.assetmanagement.repository;

import com.example.assetmanagement.model.AssetAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetAssignmentRepository extends JpaRepository<AssetAssignment, Integer> {
	
}