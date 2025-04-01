// import React, {
//   type FC,
//   MutableRefObject,
//   useEffect,
//   useImperativeHandle,
//   useState,
// } from "react";
// import {
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
// import { useQuery } from "@tanstack/react-query";
// import { useTranslations } from "next-intl";

// import DynamicMultiSelector from "@/components/dynamic-multi-selector/dynamic-multi-selector";
// import { SelectedItemCardsTypeEnum } from "@/components/dynamic-multi-selector/types";
// import { AvatarModeEnum, AvatarTypeEnum } from "@/components/avatar/interfaces";
// import { DynamicSelectorItem } from "@/components/dynamic-selector/types";
// import { ListFetchResponse } from "@/components/common/list/types";
// import { FilterRulesEnum } from "@/components/filters/types";
// import Avatar from "@/components/avatar/avatar";
// import {
//   CustomerDetailData,
//   CustomerFormData,
// } from "@/app/[locale]/admin/customers/types";
// import { fetchUsersList } from "@/app/[locale]/warehouse/users/data";
// import { UserItem } from "@/app/[locale]/warehouse/users/types";
// import { SystemRolesEnum } from "@/enums/system-roles.enum";
// import { isFormDirtyStore } from "@/store/dirty-fields";
// import { CountriesEnum } from "@/app/[locale]/admin/customers/enums";
// import DynamicSelector from "@/components/dynamic-selector/dynamic-selector";

// interface CustomerFormProps {
//   formRef: MutableRefObject<{ submitForm: () => void } | null>;
//   submit: (data: CustomerFormData) => void;
//   customerDetailData?: CustomerDetailData;
//   serviceUsersData: UserItem[];
//   // customerAdminsData: UserItem[];
//   setChangedUserIdList?: React.Dispatch<React.SetStateAction<string[]>>;
// }

// export const CustomerForm: FC<CustomerFormProps> = ({
//   formRef,
//   submit,
//   customerDetailData,
//   serviceUsersData,
//   // customerAdminsData,
//   setChangedUserIdList,
// }) => {
//   const [vatCountry, setVatCountry] = useState(
//     customerDetailData?.vatCountry || ""
//   );
//   const [previousServiceUsers, setPreviousServiceUsers] = useState<
//     DynamicSelectorItem[]
//   >([]);
//   const [previousCustomerAdmins, setPreviousCustomerAdmins] = useState<
//     DynamicSelectorItem[]
//   >([]);

//   const { setIsFormDirty } = isFormDirtyStore();

//   const t = useTranslations();

//   function getCountriesList() {
//     return Object.keys(CountriesEnum).map((key: string, index: number) => ({
//       id: (index + 1).toString(),
//       label: t(`Countries.${key.toLowerCase()}`),
//       value: CountriesEnum[key as keyof typeof CountriesEnum],
//     }));
//   }

//   const countriesList = getCountriesList();

//   // users data for the current customer
//   const { data: userListData } = useQuery<ListFetchResponse<UserItem>>({
//     queryKey: ["user-list", customerDetailData?.id],
//     queryFn: () =>
//       fetchUsersList({
//         filterAttributes: [
//           {
//             name: "customers.id",
//             value: [customerDetailData?.id!],
//             rule: FilterRulesEnum.IN,
//           },
//           {
//             name: "systemRole",
//             value: [SystemRolesEnum.CA, SystemRolesEnum.SU],
//             rule: FilterRulesEnum.IN,
//           },
//         ],
//       }),
//     enabled: !!customerDetailData,
//   });

//   const {
//     formState: { errors, isDirty },
//     setError,
//     handleSubmit,
//     setValue,
//     control,
//   } = useForm<CustomerFormData>({
//     mode: "onChange",
//     defaultValues: {
//       pictureUrl: "",
//       name: customerDetailData?.name || "",
//       alias: customerDetailData?.alias || "",
//       identificationNumber: customerDetailData?.identificationNumber || "",
//       vatNumber: customerDetailData?.vatNumber || "",
//       vatCountry: customerDetailData?.vatCountry || "",
//       email: customerDetailData?.email || "",
//       phone: customerDetailData?.phone || "",
//       zipCode: customerDetailData?.zipCode || "",
//       city: customerDetailData?.city || "",
//       street: customerDetailData?.street || "",
//       country: customerDetailData?.country || "",
//       note: customerDetailData?.note || "",
//       serviceUsers: [],
//       // customerAdmins: [],
//     },
//   });

//   useEffect(() => {
//     if (userListData) {
//       // const customerAdminIds: DynamicSelectorItem[] = [];
//       const serviceUsersIds: DynamicSelectorItem[] = [];
//       userListData?.items?.forEach((user) => {
//         if (user.systemRole === "su") {
//           serviceUsersIds.push({
//             id: user.id,
//             value: user.id.toString(),
//             label: user.name,
//           });
//         }
//         // } else {
//         //   customerAdminIds.push({ id: user.id, value: user.id.toString(), label: user.name });
//         // }
//       });
//       setValue("serviceUsers", serviceUsersIds);
//       // setValue('customerAdmins', customerAdminIds);

//       setPreviousServiceUsers(serviceUsersIds);
//       // setPreviousCustomerAdmins(customerAdminIds);
//     }
//   }, [userListData]);

//   useEffect(() => {
//     setIsFormDirty(isDirty);
//   }, [isDirty]);

//   useImperativeHandle(formRef, () => ({
//     submitForm: () => handleSubmit(submit)(),
//     setError,
//   }));

//   const imageUrl = "";

//   const handleVatCountry = (e: SelectChangeEvent) => {
//     setVatCountry(e.target.value);
//     setValue("vatCountry", e.target.value);
//   };

//   const transformUserDataForSelect = (
//     usersData: UserItem[]
//   ): DynamicSelectorItem[] =>
//     usersData.map((user) => {
//       return { id: user.id, label: user.name, value: user.id };
//     });

//   const handleChangedUsers = (
//     newSelectedUsers: DynamicSelectorItem[],
//     previousSelectedUsers: DynamicSelectorItem[]
//   ) => {
//     const newUserIds = newSelectedUsers.map((user) => user.id);
//     const previousUserIds = previousSelectedUsers.map((user) => user.id);
//     const addedUsers = newUserIds.filter((id) => !previousUserIds.includes(id));
//     const deletedUsers = previousUserIds.filter(
//       (id) => !newUserIds.includes(id)
//     );

//     if (setChangedUserIdList) {
//       setChangedUserIdList((prevChangedUserIds: string[] = []) => {
//         return Array.from(
//           new Set([
//             ...(prevChangedUserIds ?? []),
//             ...addedUsers,
//             ...deletedUsers,
//           ])
//         );
//       });
//     }
//   };

//   return (
//     <form>
//       <div data-testid="customer-detail-wrapper">
//         <div className="flex flex-col gap-3">
//           <div className="w-full flex flex-col pb-28 gap-3 md:flex-row md:pb-0 ">
//             {/*LevĂˇ ÄŤĂˇst*/}
//             <div className="flex flex-col flex-1 bg-white rounded-md px-4 py-6 gap-3">
//               {/* <div style={{ marginRight: '15px', position: 'relative' }}>
//                 <Avatar
//                   type={imageUrl ? AvatarTypeEnum.PICTURE : AvatarTypeEnum.ALIAS}
//                   mode={AvatarModeEnum.VIEW}
//                   imageUrl={imageUrl}
//                   sx={{ height: '88px', width: '88px' }}
//                   alias={customerDetailData?.alias}
//                 />
//               </div> */}
//               <div className="flex flex-col gap-2 w-full">
//                 <div className="flex row gap-2">
//                   <Stack direction="row" gap={2} width={1}>
//                     <div className="w-full">
//                       <Controller
//                         name="name"
//                         control={control}
//                         rules={{
//                           required: true,
//                         }}
//                         render={({ field }) => (
//                           <TextField
//                             {...field}
//                             label={t("Customer.name")}
//                             error={!!errors.name}
//                             variant="outlined"
//                             fullWidth
//                             placeholder={t("Customer.name")}
//                             value={field.value || ""}
//                             inputProps={{
//                               "data-testid": "customer-name-input",
//                             }}
//                           />
//                         )}
//                       />
//                       {errors.name && (
//                         <FormHelperText
//                           data-testid="customer-name-error"
//                           error={!!errors.name}
//                         >
//                           {t(
//                             "Validations.customerCreateValidation.name.required"
//                           )}
//                         </FormHelperText>
//                       )}
//                     </div>
//                     <div>
//                       <Controller
//                         name="alias"
//                         control={control}
//                         rules={{
//                           required: true,
//                         }}
//                         render={({ field }) => (
//                           <TextField
//                             {...field}
//                             label={t("Customer.alias")}
//                             variant="outlined"
//                             error={!!errors.alias}
//                             placeholder={t("Customer.alias")}
//                             value={field.value || ""}
//                             inputProps={{
//                               "data-testid": "customer-alias-input",
//                             }}
//                           />
//                         )}
//                       />
//                       {errors.alias && (
//                         <FormHelperText
//                           data-testid="customer-alias-error"
//                           error={!!errors.alias}
//                         >
//                           {t(
//                             "Validations.customerCreateValidation.alias.required"
//                           )}
//                         </FormHelperText>
//                       )}
//                     </div>
//                   </Stack>
//                 </div>
//                 <div className="flex items-end">
//                   <div className="w-full">
//                     <Controller
//                       name="identificationNumber"
//                       control={control}
//                       rules={{
//                         required: true,
//                       }}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           label={t("Customer.identificationNumber")}
//                           variant="outlined"
//                           error={!!errors.identificationNumber}
//                           fullWidth
//                           placeholder={t("Customer.identificationNumber")}
//                           value={field.value || ""}
//                           inputProps={{
//                             "data-testid":
//                               "customer-identificationNumber-input",
//                           }}
//                         />
//                       )}
//                     />
//                     {errors.identificationNumber && (
//                       <FormHelperText
//                         data-testid="customer-identificationNumber-error"
//                         error={!!errors.identificationNumber}
//                       >
//                         {t(
//                           "Validations.customerCreateValidation.identificationNumber.required"
//                         )}
//                       </FormHelperText>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <Controller
//                   name="vatCountry"
//                   control={control}
//                   render={({ field }) => (
//                     <FormControl fullWidth>
//                       <InputLabel>{t("Customer.vatCountry")}</InputLabel>
//                       <Select
//                         {...field}
//                         label={t("Customer.vatCountry")}
//                         MenuProps={{
//                           BackdropProps: {
//                             style: {
//                               backgroundColor: "transparent",
//                             },
//                           },
//                         }}
//                         variant="outlined"
//                         onChange={handleVatCountry}
//                         fullWidth
//                         placeholder={t("Customer.vatCountry")}
//                         value={field.value || ""}
//                         inputProps={{
//                           "data-testid": "customer-vatCountry-input",
//                         }}
//                       >
//                         <MenuItem value="">{t("General.leaveEmpty")}</MenuItem>
//                         {countriesList.map((country) => (
//                           <MenuItem key={country.value} value={country.value}>
//                             {country.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   )}
//                 />
//               </div>
//               <div>
//                 <Controller
//                   name="vatNumber"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label={t("Customer.vatNumber")}
//                       variant="outlined"
//                       fullWidth
//                       disabled={!vatCountry}
//                       placeholder={t("Customer.vatNumber")}
//                       value={field.value || ""}
//                       inputProps={{ "data-testid": "customer-vatNumber-input" }}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Controller
//                   name="email"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label={t("Customer.email")}
//                       variant="outlined"
//                       fullWidth
//                       placeholder={t("Customer.email")}
//                       value={field.value || ""}
//                       inputProps={{ "data-testid": "customer-email-input" }}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Controller
//                   name="phone"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label={t("Customer.phone")}
//                       variant="outlined"
//                       fullWidth
//                       placeholder={t("Customer.phone")}
//                       value={field.value || ""}
//                       inputProps={{ "data-testid": "customer-phone-input" }}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Controller
//                   name="street"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label={t("Customer.street")}
//                       variant="outlined"
//                       fullWidth
//                       placeholder={t("Customer.street")}
//                       value={field.value || ""}
//                       inputProps={{ "data-testid": "customer-street-input" }}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Controller
//                   name="city"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label={t("Customer.city")}
//                       variant="outlined"
//                       fullWidth
//                       placeholder={t("Customer.city")}
//                       value={field.value || ""}
//                       inputProps={{ "data-testid": "customer-city-input" }}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Controller
//                   name="zipCode"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label={t("Customer.zipCode")}
//                       variant="outlined"
//                       fullWidth
//                       placeholder={t("Customer.zipCode")}
//                       value={field.value || ""}
//                       inputProps={{ "data-testid": "customer-zipCode-input" }}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Controller
//                   name="country"
//                   control={control}
//                   render={({ field }) => (
//                     <FormControl fullWidth>
//                       <DynamicSelector
//                         {...field}
//                         placeholder={t("Customer.country")}
//                         value={field.value || ""}
//                         options={{ items: countriesList }}
//                         showSearch={true}
//                         hasEmptyValueItem={true}
//                       />
//                     </FormControl>
//                   )}
//                 />
//               </div>
//               <div>
//                 <Controller
//                   name="note"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label={t("Customer.note")}
//                       variant="outlined"
//                       fullWidth
//                       multiline
//                       placeholder={t("Customer.note")}
//                       value={field.value || ""}
//                       inputProps={{ "data-testid": "customer-note-input" }}
//                     />
//                   )}
//                 />
//               </div>
//             </div>
//             {/*PravĂˇ ÄŤĂˇst*/}
//             <div className="flex-1 bg-white rounded-md items-center justify-center flex flex-col px-4 py-6">
//               <div className="w-full h-[650px] border border-indigo-400 flex flex-col gap-3">
//                 <div data-testid="customer-form-service-users">
//                   <Typography variant="body2" component="p">
//                     {t("Customer.serviceUsers")}
//                   </Typography>
//                   <Controller
//                     name="serviceUsers"
//                     control={control}
//                     render={({ field }) => (
//                       <DynamicMultiSelector
//                         {...field}
//                         selectedItemCardsType={SelectedItemCardsTypeEnum.TEXT}
//                         placeholder={t("General.addServiceUser")}
//                         options={{
//                           items: transformUserDataForSelect(serviceUsersData),
//                         }}
//                         showSearch={true}
//                         isTreeOpened={false}
//                         onChange={(selectedItems) => {
//                           handleChangedUsers(
//                             selectedItems,
//                             previousServiceUsers
//                           );
//                           field.onChange(selectedItems);
//                         }}
//                       />
//                     )}
//                   />
//                 </div>

//                 {/*ZakomentovĂˇno pro pĹ™Ă­padnĂ© pouĹľitĂ­ v budoucnu, ale nynĂ­ pouĹľĂ­vĂˇme vytvoĹ™it sprĂˇvce zĂˇkaznĂ­ka v akcĂ­ch pro detail zĂˇkaznĂ­ka*/}

//                 {/*<div data-testid="customer-form-customer-admins">*/}
//                 {/*  <Typography variant="body2" component="p">*/}
//                 {/*    {t('Customer.customerAdmins')}*/}
//                 {/*  </Typography>*/}
//                 {/*  <Controller*/}
//                 {/*    name="customerAdmins"*/}
//                 {/*    control={control}*/}
//                 {/*    render={({ field }) => (*/}
//                 {/*      <DynamicMultiSelector*/}
//                 {/*        {...field}*/}
//                 {/*        selectedItemCardsType={SelectedItemCardsTypeEnum.TEXT}*/}
//                 {/*        placeholder={t('General.addCustomerAdmin')}*/}
//                 {/*        options={{ items: transformUserDataForSelect(customerAdminsData) }}*/}
//                 {/*        showSearch={true}*/}
//                 {/*        isTreeOpened={false}*/}
//                 {/*        onChange={(selectedItems) => {*/}
//                 {/*          handleChangedUsers(selectedItems, previousCustomerAdmins);*/}
//                 {/*          field.onChange(selectedItems);*/}
//                 {/*        }}*/}
//                 {/*      />*/}
//                 {/*    )}*/}
//                 {/*  />*/}
//                 {/*</div>*/}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };
