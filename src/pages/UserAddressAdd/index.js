import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, FormControl, InputText, LayoutOne, Textarea } from "upkit";
import { createAddress } from "../../api/address";
import TopBar from "../../components/TopBar";
import { rules } from "./validation";
import SelectWilayah from "../../components/SelectWilayah";

export default function UserAddressAdd() {
  let history = useHistory();
  let {
    handleSubmit,
    register,
    errors,
    setValue,
    watch,
    getValues,
  } = useForm();
  let allFields = watch();

  useEffect(() => {
    register({ name: "provinsi" }, rules.provinsi);
    register({ name: "kabupaten" }, rules.kabupaten);
    register({ name: "kecamatan" }, rules.kecamatan);
    register({ name: "kelurahan" }, rules.kelurahan);
  }, [register]);

  useEffect(() => {
    setValue("kabupaten", null);
    setValue("kecamatan", null);
    setValue("kelurahan", null);
  }, [allFields.provinsi, setValue]);

  useEffect(() => {
    setValue("kecamatan", null);
    setValue("kelurahan", null);
  }, [allFields.kabupaten, setValue]);

  useEffect(() => {
    setValue("kelurahan", null);
  }, [allFields.kecamatan, setValue]);

  const updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  const onSubmit = async (formData) => {
    let payload = {
      nama: formData.nama_alamat,
      detail: formData.detail_alamat,
      provinsi: formData.provinsi.label,
      kabupaten: formData.kabupaten.label,
      kecamatan: formData.kecamatan.label,
      kelurahan: formData.kelurahan.label,
    };

    let { data } = await createAddress(payload);

    if (data.error) return;

    history.push("/alamat-pengiriman");
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Nama alamat"
            errorMessage={errors.nama_alamat?.message}
            color="black"
          >
            <InputText
              placeholder="Nama alamat"
              fitContainer
              name="nama_alamat"
              ref={register(rules.nama_alamat)}
            />
          </FormControl>

          <FormControl
            label="Provinsi"
            errorMessage={errors.provinsi?.message}
            color="black"
          >
            <SelectWilayah
              onChange={(option) => updateValue("provinsi", option)}
              name="provinsi"
              value={getValues().provinsi}
            />
          </FormControl>

          <FormControl
            label="Kabupaten"
            errorMessage={errors.kabupaten?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="Kabupaten"
              kodeInduk={getValues().provinsi?.value}
              onChange={(option) => updateValue("kabupaten", option)}
              value={getValues().kabupaten}
            />
          </FormControl>

          <FormControl
            label="Kecamatan"
            errorMessage={errors.kecamatan?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="Kecamatan"
              kodeInduk={getValues().kabupaten?.value}
              onChange={(option) => updateValue("kecamatan", option)}
              value={getValues().kecamatan}
            />
          </FormControl>

          <FormControl
            label="Kelurahan"
            errorMessage={errors.kelurahan?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="desa"
              kodeInduk={getValues().kecamatan?.value}
              onChange={(option) => updateValue("kelurahan", option)}
              value={getValues().kelurahan}
            />
          </FormControl>

          <FormControl
            label="Detail alamat"
            errorMessage={errors.detail_alamat?.message}
            color="black"
          >
            <Textarea
              placeholder="Detail alamat"
              fitContainer
              name="detail_alamat"
              ref={register(rules.detail_alamat)}
            />
          </FormControl>

          <Button fitContainer>Simpan</Button>
        </form>
      </div>
    </LayoutOne>
  );
}
