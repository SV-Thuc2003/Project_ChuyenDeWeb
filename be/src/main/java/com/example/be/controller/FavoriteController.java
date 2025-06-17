//package com.example.be.controller;
//
//import com.example.be.entity.Favorite;
//import com.example.be.service.FavoriteService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/favorites")
//@RequiredArgsConstructor
//public class FavoriteController {
//
//    private final FavoriteService favoriteService;
//
//    @PostMapping
//    public void addFavorite(@RequestParam Integer userId, @RequestParam Integer productId) {
//        favoriteService.addFavorite(userId, productId);
//    }
//
//    @DeleteMapping
//    public void removeFavorite(@RequestParam Integer userId, @RequestParam Integer productId) {
//        favoriteService.removeFavorite(userId, productId);
//    }
//
//    @GetMapping("/{userId}")
//    public List<Favorite> getFavorites(@PathVariable Integer userId) {
//        return favoriteService.getFavoritesByUser(userId);
//    }
//}

package com.example.be.controller;

import com.example.be.dto.response.FavoriteResponse;
import com.example.be.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping
    public void addFavorite(@RequestParam Integer userId, @RequestParam Integer productId) {
        favoriteService.addFavorite(userId, productId);
    }

    @DeleteMapping
    public void removeFavorite(@RequestParam Integer userId, @RequestParam Integer productId) {
        favoriteService.removeFavorite(userId, productId);
    }

    @GetMapping("/{userId}")
    public List<FavoriteResponse> getFavorites(@PathVariable Integer userId) {
        return favoriteService.getFavoritesByUser(userId);
    }
}

