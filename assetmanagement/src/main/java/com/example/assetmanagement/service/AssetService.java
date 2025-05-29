package com.example.assetmanagement.service;

import com.example.assetmanagement.model.Asset;
import com.example.assetmanagement.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetService {
    @Autowired
    private AssetRepository assetRepository;

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Optional<Asset> getAssetById(Integer id) {
        return assetRepository.findById(id);
    }

    public Asset createAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public Asset updateAsset(Integer id, Asset updatedAsset) {
        Optional<Asset> existingAsset = assetRepository.findById(id);
        if (existingAsset.isPresent()) {
            Asset asset = existingAsset.get();
            asset.setAssetType(updatedAsset.getAssetType());
            asset.setSerialNumber(updatedAsset.getSerialNumber());
            asset.setDescription(updatedAsset.getDescription());
            asset.setPurchaseDate(updatedAsset.getPurchaseDate());
            asset.setStatus(updatedAsset.getStatus());
            return assetRepository.save(asset);
        }
        return null;
    }

    public void deleteAsset(Integer id) {
        assetRepository.deleteById(id);
    }
}