package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_filter_values")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductFilterValue {

    @EmbeddedId
    private ProductFilterValueId id;

    @MapsId("productId")
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @MapsId("filterId")
    @ManyToOne
    @JoinColumn(name = "filter_id", nullable = false)
    private ProductFilter filter;

    @Column(name = "value", insertable = false, updatable = false)
    private String value;

}
