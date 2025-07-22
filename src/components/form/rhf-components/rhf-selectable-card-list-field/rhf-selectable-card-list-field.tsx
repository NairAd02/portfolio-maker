"use client";

import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import React, { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import DeselectionMask from "./components/deselection-mask-card/deselection-mask-card";
import { cn } from "@/lib/utils";

interface Props<T> {
  name: string;
  modalPath: string;
  label?: string;
  emptyText?: string;
  selectElementsText?: string;
  CardComponent: React.ComponentType<{ data: T }>;
  className?: string;
  errorClassName?: string;
}

export default function RHFSelectableCardListField<T extends { id: string }>({
  name,
  label = "Elementos seleccionados",
  emptyText = "No hay elementos seleccionados",
  selectElementsText = "Seleccione más elementos",
  modalPath,
  CardComponent,
  className,
  errorClassName = "text-red-500 text-sm mt-1",
}: Props<T>) {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const { handleOpenModal } = useContext(ModalContext);
  const selectedValues = watch(name) as T[];

  const handleSelect = useCallback(
    (values: T[]) => {
      const newValues = [...selectedValues, ...values];
      setValue(name, newValues);
      trigger(name);
    },
    [setValue, trigger, name, selectedValues]
  );

  const onSelectModalOpen = useCallback(() => {
    handleOpenModal({
      name: modalPath,
      elements: selectedValues,
      actionInsert: handleSelect,
    });
  }, [handleOpenModal, modalPath, selectedValues, handleSelect]);

  const handleRemove = useCallback(
    (id: string) => {
      setValue(
        name,
        selectedValues.filter((item) => item.id !== id)
      );
      trigger(name);
    },
    [selectedValues, setValue, name, trigger]
  );

  return (
    <div className={cn("flex flex-col h-full gap-4", className)}>
      <div className="flex justify-between gap-2">
        <h3 className="font-medium text-lg mb-3">{label}</h3>
        <Button type="button" onClick={onSelectModalOpen}>
          {selectElementsText}
        </Button>
      </div>

      {selectedValues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[42vh] p-2 overflow-auto">
          {selectedValues.map((selectedValue, index) => (
            <DeselectionMask
              key={index}
              handleRemove={() => {
                handleRemove(selectedValue.id);
              }}
            >
              <CardComponent data={selectedValue} />
            </DeselectionMask>
          ))}
        </div>
      ) : (
        <div>{emptyText}</div>
      )}
      {errors[name] && (
        <p className={errorClassName}>{errors[name]?.message as string}</p>
      )}
    </div>
  );
}
