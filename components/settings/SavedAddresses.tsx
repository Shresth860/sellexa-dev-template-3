"use client";

import { useEffect, useState } from "react";
import { MapPin, MoreHorizontal } from "lucide-react";
import Swal from "sweetalert2";

type Address = {
  id: string;
  label: string;
  line1: string;
  line2: string;
  country: string;
  phone: string;
};

type AddressFormValues = Omit<Address, "id"> & { id: string | null };

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "home",
    label: "Home",
    line1: "123, Green Park, Civil Lines",
    line2: "Bareilly, Uttar Pradesh - 243001",
    country: "India",
    phone: "+91 98765 43210",
  },
  {
    id: "work",
    label: "Work",
    line1: "456, Tech Park, Sector 62",
    line2: "Noida, Uttar Pradesh - 201309",
    country: "India",
    phone: "+91 98765 43210",
  },
];

const EMPTY_FORM: AddressFormValues = {
  id: null,
  label: "",
  line1: "",
  line2: "",
  country: "India",
  phone: "",
};

function AddressForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: AddressFormValues;
  onCancel: () => void;
  onSave: (values: AddressFormValues) => void;
}) {
  const [values, setValues] = useState<AddressFormValues>(initial);

  const updateField =
    (field: keyof AddressFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };

  const isValid =
    values.label.trim() && values.line1.trim() && values.phone.trim();

  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          value={values.label}
          onChange={updateField("label")}
          placeholder="Label (e.g. Home)"
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
        />
        <input
          value={values.phone}
          onChange={updateField("phone")}
          placeholder="Phone Number"
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
        />
        <input
          value={values.line1}
          onChange={updateField("line1")}
          placeholder="Address line"
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 sm:col-span-2"
        />
        <input
          value={values.line2}
          onChange={updateField("line2")}
          placeholder="City, State - Pincode"
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
        />
        <input
          value={values.country}
          onChange={updateField("country")}
          placeholder="Country"
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
        />
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-zinc-200 px-4 py-2 text-[12px] font-semibold text-zinc-600 transition hover:bg-zinc-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={() => onSave(values)}
          className="rounded-full bg-black px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}

const ADDRESSES_STORAGE_KEY = "sellexa-addresses";

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [formState, setFormState] = useState<AddressFormValues | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load saved addresses
  useEffect(() => {
    try {
      const saved = localStorage.getItem(ADDRESSES_STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setAddresses(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
    }

    setMounted(true);
  }, []);

  // Persist addresses
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      ADDRESSES_STORAGE_KEY,
      JSON.stringify(addresses)
    );
  }, [addresses, mounted]);

  const handleAddClick = () => {
    setFormState(EMPTY_FORM);
  };

  const handleEditClick = (address: Address) => {
    setOpenMenuId(null);
    setFormState(address);
  };

  const handleDeleteClick = async (address: Address) => {
    setOpenMenuId(null);

    const result = await Swal.fire({
      title: `Remove "${address.label}" address?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      confirmButtonColor: "#000",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setAddresses((previous) =>
        previous.filter((item) => item.id !== address.id)
      );
    }
  };

  const handleFormSave = (values: AddressFormValues) => {
    if (values.id) {
      setAddresses((previous) =>
        previous.map((item) =>
          item.id === values.id ? { ...values, id: values.id! } : item
        )
      );
    } else {
      setAddresses((previous) => [
        ...previous,
        { ...values, id: crypto.randomUUID() },
      ]);
    }

    setFormState(null);
  };

  return (
    <div
      id="address"
      className="flex-1 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold">Saved Addresses</h2>
          <p className="mt-0.5 text-[13px] text-zinc-500">
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          type="button"
          disabled={formState !== null}
          onClick={handleAddClick}
          className="shrink-0 rounded-full bg-black px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add New Address
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {addresses.map((address) =>
          formState?.id === address.id ? (
            <AddressForm
              key={address.id}
              initial={formState}
              onCancel={() => setFormState(null)}
              onSave={handleFormSave}
            />
          ) : (
            <div
              key={address.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-zinc-100 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100">
                  <MapPin
                    size={15}
                    strokeWidth={1.8}
                    className="text-zinc-500"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {address.label}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-5 text-zinc-500">
                    {address.line1}
                    <br />
                    {address.line2}
                    <br />
                    {address.country}
                    <br />
                    {address.phone}
                  </p>
                </div>
              </div>

              <div className="relative shrink-0">
                <button
                  type="button"
                  disabled={formState !== null}
                  aria-label={`More options for ${address.label} address`}
                  onClick={() =>
                    setOpenMenuId((current) =>
                      current === address.id ? null : address.id
                    )
                  }
                  className="flex size-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <MoreHorizontal size={17} strokeWidth={1.8} />
                </button>

                {openMenuId === address.id && (
                  <div className="absolute right-0 top-9 z-10 w-32 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg">
                    <button
                      type="button"
                      onClick={() => handleEditClick(address)}
                      className="block w-full px-3 py-2 text-left text-[13px] text-zinc-700 transition hover:bg-zinc-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(address)}
                      className="block w-full px-3 py-2 text-left text-[13px] text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {formState?.id === null && (
          <AddressForm
            initial={formState}
            onCancel={() => setFormState(null)}
            onSave={handleFormSave}
          />
        )}
      </div>
    </div>
  );
}
