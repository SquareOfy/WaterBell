package com.ssafy.fcc.domain.facility;

import com.ssafy.fcc.domain.location.Gugun;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "facility_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gugun_id")
    private Gugun gugun;

    @Column(columnDefinition = "TINYINT(1)")
    private boolean isApart;

    private String firstFloodMessage;

    private String secondFloodMessage;

    private Integer firstAlarmValue;

    private Integer secondAlarmValue;

    private String hubIp;

    @Enumerated(EnumType.STRING)
    private WaterStatus status;


}
