"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./toast";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete "${productName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      showToast(`Product "${productName}" deleted successfully!`, "success");

      // Refresh the page to show updated list
      router.refresh();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to delete product",
        "error"
      );
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
