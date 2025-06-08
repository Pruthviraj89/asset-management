package com.example.assetmanagement.repository;

import com.example.assetmanagement.model.Asset;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset, Integer> {
	
	List<Asset> findByAvailableTrue();
}