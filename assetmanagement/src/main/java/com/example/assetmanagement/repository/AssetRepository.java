package com.example.assetmanagement.repository;

import com.example.assetmanagement.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset, Integer> {
}