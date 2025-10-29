package com.example.photopage.repository;
import java.util.Optional;

import com.example.photopage.model.Photo;
import com.example.photopage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u.avatar FROM User u WHERE u.userId = :userId")
    Photo findAvatarByUserId(@Param("userId") Integer userId);

}

