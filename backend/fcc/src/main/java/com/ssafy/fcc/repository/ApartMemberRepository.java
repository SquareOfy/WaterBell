package com.ssafy.fcc.repository;

import com.ssafy.fcc.domain.member.ApartMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ApartMemberRepository {

    private final EntityManager em;

    public List<ApartMember> findByApartId(int apartId) {
        return em.createQuery("select m from ApartMember m where m.apart.id = :apartId", ApartMember.class)
                .setParameter("apartId", apartId)
                .getResultList();
    }
}
