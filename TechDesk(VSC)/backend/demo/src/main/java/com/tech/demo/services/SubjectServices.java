package com.tech.demo.services;

import com.tech.demo.other.Subject;

import java.util.List;

public interface SubjectService {

    List<Subject> getAllSubjects();

    Subject getSubjectById(Long id);

    Subject createSubject(Subject subject);

    Subject updateSubject(Long id, Subject subject);

    void deleteSubject(Long id);
}