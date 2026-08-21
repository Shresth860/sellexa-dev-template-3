"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Crosshair,
  Home,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type Address = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
};

type DeliveryCardProps = {
  selectedAddress: Address | null;
  addresses: Address[];
  onSelectAddress: (address: Address | null) => void;
};

const SAVED_ADDRESS_KEY = "sellexa-addresses";

const emptyForm = {
  name: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
};

export default function DeliveryCard({
  selectedAddress,
  addresses: initialAddresses,
  onSelectAddress,
}: DeliveryCardProps) {
  const [addresses, setAddresses] =
    useState<Address[]>(initialAddresses);

  const [showAddresses, setShowAddresses] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);

  const [isLocating, setIsLocating] =
    useState(false);

  const [locationError, setLocationError] =
    useState("");

  /* Load locally saved addresses */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        SAVED_ADDRESS_KEY
      );

      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setAddresses([
          ...initialAddresses,
          ...parsed.filter(
            (savedAddress: Address) =>
              !initialAddresses.some(
                (item) => item.id === savedAddress.id
              )
          ),
        ]);
      }
    } catch (error) {
      console.error(
        "Failed to load saved addresses:",
        error
      );
    }
  }, [initialAddresses]);

  /* Save addresses locally */
  const persistAddresses = (
    nextAddresses: Address[]
  ) => {
    setAddresses(nextAddresses);

    const localOnly = nextAddresses.filter(
      (address) =>
        !initialAddresses.some(
          (item) => item.id === address.id
        )
    );

    localStorage.setItem(
      SAVED_ADDRESS_KEY,
      JSON.stringify(localOnly)
    );
  };

  /* Select saved address */
  const handleSelect = (address: Address) => {
    onSelectAddress(address);
    setShowForm(false);
    setEditingId(null);
  };

  /* Open add form */
  const handleAddNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setLocationError("");
    setShowForm(true);
  };

  /* Open edit form */
  const handleEdit = (address: Address) => {
    setForm({
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
    });

    setEditingId(address.id);
    setShowForm(true);
    setLocationError("");
  };

  /* Delete address */
  const handleDelete = (id: string) => {
    const addressToDelete = addresses.find(
      (address) => address.id === id
    );

    if (!addressToDelete) return;

    const nextAddresses = addresses.filter(
      (address) => address.id !== id
    );

    persistAddresses(nextAddresses);

    if (selectedAddress?.id === id) {
      onSelectAddress(null);
    }
  };

  /* Form change */
  const handleChange = (
    field: keyof typeof emptyForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* Save address */
  const handleSaveAddress = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim() ||
      !form.phone.trim()
    ) {
      return;
    }

    let savedAddress: Address;

    if (editingId) {
      savedAddress = {
        id: editingId,
        ...form,
      };

      const nextAddresses = addresses.map(
        (address) =>
          address.id === editingId
            ? savedAddress
            : address
      );

      persistAddresses(nextAddresses);
    } else {
      savedAddress = {
        id: `address-${Date.now()}`,
        ...form,
      };

      persistAddresses([
        ...addresses,
        savedAddress,
      ]);
    }

    onSelectAddress(savedAddress);

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  /*
   * Get current location
   *
   * Browser gives us latitude/longitude.
   * Nominatim converts those coordinates into
   * a readable address.
   */
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported by this browser."
      );
      return;
    }

    setIsLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const {
            latitude,
            longitude,
          } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              "Unable to find address."
            );
          }

          const data = await response.json();

          const address = data.address ?? {};

          const currentAddress: Address = {
            id: `location-${Date.now()}`,
            name: "Current Location",
            address:
              data.display_name ||
              "Current location",
            city:
              address.city ||
              address.town ||
              address.village ||
              address.municipality ||
              "",
            state:
              address.state || "",
            pincode:
              address.postcode || "",
            phone: "",
          };

          onSelectAddress(currentAddress);
          setShowForm(false);
        } catch (error) {
          console.error(
            "Reverse geocoding failed:",
            error
          );

          setLocationError(
            "Could not fetch your address. Please add it manually."
          );
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error(
          "Location permission error:",
          error
        );

        setIsLocating(false);

        if (error.code === 1) {
          setLocationError(
            "Location permission was denied."
          );
        } else {
          setLocationError(
            "Unable to detect your location."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  return (
    <section className="overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:rounded-[28px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Delivery
          </p>

          <h2 className="mt-1 text-base font-bold tracking-tight text-zinc-950 sm:text-lg">
            Delivery address
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowAddresses((value) => !value)
          }
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 transition hover:bg-zinc-100"
          aria-label="Toggle delivery addresses"
        >
          {showAddresses ? (
            <ChevronUp size={15} />
          ) : (
            <ChevronDown size={15} />
          )}
        </button>
      </div>

      {showAddresses && (
        <div className="p-4 sm:p-5 lg:p-6">
          {/* Current selected address */}
          {selectedAddress && (
            <div className="mb-4 rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-white">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Check size={16} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold">
                      Delivering to
                    </p>

                    <span className="rounded-full bg-white/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-white/70">
                      Selected
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {selectedAddress.name}
                  </p>

                  <p className="mt-1 text-[14px] leading-5 text-white/60">
                    {selectedAddress.address}
                    {selectedAddress.city
                      ? `, ${selectedAddress.city}`
                      : ""}
                    {selectedAddress.state
                      ? `, ${selectedAddress.state}`
                      : ""}
                    {selectedAddress.pincode
                      ? ` - ${selectedAddress.pincode}`
                      : ""}
                  </p>

                  {selectedAddress.phone && (
                    <p className="mt-2 text-[12px] text-white/50">
                      +91 {selectedAddress.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick location actions */}
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleCurrentLocation}
              disabled={isLocating}
              className="group flex min-h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 text-left transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white">
                <Crosshair
                  size={14}
                  className={
                    isLocating
                      ? "animate-spin"
                      : ""
                  }
                />
              </span>

              <span className="min-w-0">
                <span className="block text-xs font-semibold text-zinc-900">
                  {isLocating
                    ? "Detecting location..."
                    : "Use current location"}
                </span>

                <span className="mt-0.5 block text-[12px] text-zinc-400">
                  Automatically find your address
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={handleAddNew}
              className="flex min-h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 text-left transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-800">
                <Plus size={15} />
              </span>

              <span>
                <span className="block text-xs font-semibold text-zinc-900">
                  Add new address
                </span>

                <span className="mt-0.5 block text-[12px] text-zinc-400">
                  Enter your delivery details
                </span>
              </span>
            </button>
          </div>

          {/* Location error */}
          {locationError && (
            <div className="mt-3 rounded-xl bg-red-50 px-3 py-2.5 text-[12px] leading-4 text-red-600">
              {locationError}
            </div>
          )}

          {/* Add / edit form */}
          {showForm && (
            <form
              onSubmit={handleSaveAddress}
              className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    {editingId
                      ? "Edit address"
                      : "New address"}
                  </p>

                  <h3 className="mt-1 text-sm font-bold text-zinc-950">
                    Delivery details
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-500 shadow-sm"
                  aria-label="Close address form"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  value={form.name}
                  onChange={(event) =>
                    handleChange(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Full name"
                  required
                  className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-xs outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                />

                <input
                  value={form.phone}
                  onChange={(event) =>
                    handleChange(
                      "phone",
                      event.target.value.replace(
                        /\D/g,
                        ""
                      ).slice(0, 10)
                    )
                  }
                  placeholder="Phone number"
                  inputMode="numeric"
                  required
                  className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-xs outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                />

                <input
                  value={form.address}
                  onChange={(event) =>
                    handleChange(
                      "address",
                      event.target.value
                    )
                  }
                  placeholder="House / street / area"
                  required
                  className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-xs outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10 sm:col-span-2"
                />

                <input
                  value={form.city}
                  onChange={(event) =>
                    handleChange(
                      "city",
                      event.target.value
                    )
                  }
                  placeholder="City"
                  required
                  className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-xs outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                />

                <input
                  value={form.state}
                  onChange={(event) =>
                    handleChange(
                      "state",
                      event.target.value
                    )
                  }
                  placeholder="State"
                  required
                  className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-xs outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                />

                <input
                  value={form.pincode}
                  onChange={(event) =>
                    handleChange(
                      "pincode",
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  placeholder="Pincode"
                  inputMode="numeric"
                  required
                  className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-xs outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>

              <button
                type="submit"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-zinc-950 px-5 text-xs font-semibold text-white transition hover:bg-zinc-800"
              >
                {editingId
                  ? "Update address"
                  : "Save & use this address"}
              </button>
            </form>
          )}

          {/* Saved addresses */}
          {addresses.length > 0 && (
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Saved addresses
                </p>

                <span className="text-[12px] text-zinc-400">
                  {addresses.length} saved
                </span>
              </div>

              <div className="space-y-2.5">
                {addresses.map((address) => {
                  const isSelected =
                    selectedAddress?.id ===
                    address.id;

                  return (
                    <div
                      key={address.id}
                      className={`group rounded-2xl border p-3 transition sm:p-4 ${
                        isSelected
                          ? "border-zinc-900 bg-zinc-50"
                          : "border-zinc-200 bg-white hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleSelect(address)
                          }
                          className="flex min-w-0 flex-1 items-start gap-3 text-left"
                        >
                          <span
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                              isSelected
                                ? "bg-zinc-950 text-white"
                                : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {isSelected ? (
                              <Check size={14} />
                            ) : (
                              <Home size={14} />
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-zinc-900">
                                {address.name}
                              </span>

                              {isSelected && (
                                <span className="text-[8px] font-semibold uppercase tracking-wider text-zinc-400">
                                  Selected
                                </span>
                              )}
                            </span>

                            <span className="mt-1 block text-[12px] leading-5 text-zinc-500">
                              {address.address},{" "}
                              {address.city},{" "}
                              {address.state}{" "}
                              {address.pincode}
                            </span>

                            {address.phone && (
                              <span className="mt-1 block text-[12px] text-zinc-400">
                                +91 {address.phone}
                              </span>
                            )}
                          </span>
                        </button>

                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(address)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
                            aria-label="Edit address"
                          >
                            <Pencil size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(address.id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
                            aria-label="Delete address"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No saved address */}
          {addresses.length === 0 &&
            !showForm && (
              <div className="mt-5 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-5 py-6 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-400 shadow-sm">
                  <MapPin size={17} />
                </div>

                <p className="mt-3 text-sm font-semibold text-zinc-800">
                  No saved addresses
                </p>

                <p className="mx-auto mt-1 max-w-xs text-[12px] leading-4 text-zinc-400">
                  Use your current location or add a
                  new delivery address to continue.
                </p>
              </div>
            )}
        </div>
      )}
    </section>
  );
}