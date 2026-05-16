package com.springpath.entity;

import com.springpath.enums.CourseLevel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String slug;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CourseLevel level;

    @Column(length = 7)
    private String color;

    @Column(length = 50)
    private String icon;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;

    @Column(name = "is_published")
    @Builder.Default
    private boolean isPublished = false;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    @Builder.Default
    @org.hibernate.annotations.Fetch(org.hibernate.annotations.FetchMode.SUBSELECT)
    private List<Module> modules = new ArrayList<>();
}
// ✅ Course.java — complete
