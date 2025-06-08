package com.example.assetmanagement.service;

import com.example.assetmanagement.model.Asset;
import com.example.assetmanagement.model.Asset.AssetStatus;
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
    
    @Autowired
    private AssetService assetService;

    public List<AssetAssignment> getAllAssignments() {
    	
    		
        return assetAssignmentRepository.findAll();
    }

    public Optional<AssetAssignment> getAssignmentById(Integer id) {
        return assetAssignmentRepository.findById(id);
    }

    public AssetAssignment createAssignment(AssetAssignment assignment) {
    	
    	
    	
    	Optional<Asset> asset	=assetService.getAssetById(assignment.getAsset().getAssetId());
    	
    
    	 		
    	 asset.ifPresent(a->{
    		 a.setStatus(AssetStatus.Assigned);
    		 a.setAvailable(false);
    	 });
    	 
    	 Integer assetId= asset.get().getAssetId();
    	 
    	 if(asset.isPresent()) {
    		 Asset a= asset.get();
    		 
    		 assetService.updateAsset(assetId, a);
    	 }
    	 
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
    	
    	Optional<AssetAssignment> assignment= getAssignmentById(id);
    	
    	
    	Optional<Asset> asset=assetService.getAssetById(assignment.get().getAsset().getAssetId());
    	
        
 		
   	 asset.ifPresent(a->{
   		 a.setStatus(AssetStatus.Unassigned);
   		 a.setAvailable(true);
   	 });
   	 
   	 
   	 if(asset.isPresent()) {
   		 Asset a= asset.get();
   		Integer assetId= asset.get().getAssetId();
   		 assetService.updateAsset(assetId, a);
   	 }
    	
    	
    	
        assetAssignmentRepository.deleteById(id);
    }
}