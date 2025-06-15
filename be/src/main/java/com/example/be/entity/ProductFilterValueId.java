package com.example.be.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductFilterValueId implements Serializable {
    private Integer productId;
    private Integer filterId;
//    private String value;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductFilterValueId)) return false;
        ProductFilterValueId that = (ProductFilterValueId) o;
        return Objects.equals(productId, that.productId) &&
                Objects.equals(filterId, that.filterId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, filterId);
    }
}
