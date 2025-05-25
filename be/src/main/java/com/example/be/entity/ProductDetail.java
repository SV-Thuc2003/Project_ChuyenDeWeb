package com.example.be.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name ="product_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDetail {
   @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;

   @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

   @Column(name = "capacity_l_per_hour")
    private Integer capacityLPerHour;

   private String technology;

   @Column(name = "power_consumption")
    private String powerConsumption;

   private String dimensions;
   private String material;

   @Column(name = "weight_kg")
    private Double weightKg;
   @Column(name = "additional_info", columnDefinition = "TEXT")
    private String additionalInfo;
}

