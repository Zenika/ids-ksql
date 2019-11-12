package com.zenika.ids.service.impl;

import com.zenika.ids.service.DepartmentService;
import com.zenika.ids.domain.Department;
import com.zenika.ids.repository.DepartmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Department}.
 */
@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    /**
     * Save a department.
     *
     * @param department the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Department save(Department department) {
        log.debug("Request to save Department : {}", department);
        return departmentRepository.save(department);
    }

    /**
     * Get all the departments.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Department> findAll() {
        log.debug("Request to get all Departments");
        return departmentRepository.findAll();
    }


    /**
     * Get one department by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Department> findOne(Long id) {
        log.debug("Request to get Department : {}", id);
        return departmentRepository.findById(id);
    }

    /**
     * Delete the department by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Department : {}", id);
        departmentRepository.deleteById(id);
    }
}
