package com.example.Leads.repository;

import com.example.Leads.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryLead extends JpaRepository<Lead, Long> {
}
