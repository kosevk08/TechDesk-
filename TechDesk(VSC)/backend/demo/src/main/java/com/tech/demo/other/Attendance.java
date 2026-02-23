package com.techdesk.other;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String studentEgn;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String status;


    private LocalTime arrivalTime;

    private Integer minutesLate;

    private String markedByEgn;

    public Attendance() {}

    public Long getId() {return id;}
}