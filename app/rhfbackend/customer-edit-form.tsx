// import { type FC, useRef, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useTranslations } from "use-intl";
// import { useForm } from "react-hook-form";
// import Cookies from "js-cookie";

// import ListHeading from "@/components/list-heading/list-heading";
// import ModalDialogBasic from "@/components/common/modal-dialog/modal-dialog-basic";
// import { FilterRulesEnum } from "@/components/filters/types";
// import {
//   CustomerEditFormProps,
//   CustomerFormData,
// } from "@/app/[locale]/admin/customers/types";
// import { cardUpdateMapErrorToTranslationKey } from "@/app/[locale]/warehouse/warehouse-cards/helpers";
// import { updateCustomer } from "@/app/[locale]/admin/customers/data";
// import { CustomerForm } from "@/app/[locale]/admin/customers/form/customer-form";
// import { fetchUsersList } from "@/app/[locale]/warehouse/users/data";
// import { UserItem } from "@/app/[locale]/warehouse/users/types";
// import { ValidationError } from "@/app/types";
// import { useVisitedListItemsStore } from "@/store/visited-list-item";
// import { ListNamesEnum } from "@/enums/list-names-enum";

// type ErrorMessagesType = {
//   [key: string]: string;
// };

// // toto neni treba takto, BE uz posiela namapovane chyby
// const ERROR_MESSAGES: ErrorMessagesType = {
//   "name.structure-name-already-exists": "structureNameExists",
//   "identificationNumber.customer-identificationNumber-already-exists":
//     "uniqueIdentificationNumber",
// };

// export const CustomerEditForm: FC<CustomerEditFormProps> = ({
//   formMode,
//   onSuccess,
//   customerDetailData,
// }) => {
//   const [isGeneralErrorUpdateModalOpen, setGeneralErrorUpdateModalOpen] =
//     useState<boolean>(false);
//   const [errorsMsg, setErrorsMsg] = useState<string>("");
//   const [changedUserIdList, setChangedUserIdList] = useState<string[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const warehouseId = Cookies.get("environmentId");
//   const t = useTranslations();

//   const formRef = useRef<{
//     submitForm: () => void;
//     setError: ReturnType<typeof useForm>["setError"];
//   }>(null);

//   const handleSubmit = async (data: CustomerFormData) => {
//     const newData = {
//       name: data.name,
//       alias: data.alias,
//       ...(data.vatCountry && { vatCountry: data.vatCountry }),
//       vatNumber: data.vatNumber,
//       identificationNumber: data.identificationNumber,
//       email: data.email,
//       phone: data.phone,
//       street: data.street,
//       city: data.city,
//       zipCode: data.zipCode,
//       ...(data.country && { country: data.country }),
//       note: data.note,
//       isActive: data.isActive,
//       users: changedUserIdList,
//       warehouseId: warehouseId,
//       ...(customerDetailData && { customerId: customerDetailData.id }),
//     };

//     try {
//       setIsSubmitting(true);
//       const response = await updateCustomer(newData);

//       if (response && "error" in response) {
//         handleBackendErrors(response);
//         setIsSubmitting(false);
//         return;
//       }

//       if (formMode === "create" && response?.id) {
//         useVisitedListItemsStore
//           .getState()
//           .setVisitedItems(ListNamesEnum.ADMIN_CUSTOMERS, [response.id]);
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("An error occurred while updating the structure:", error);
//       setGeneralErrorUpdateModalOpen(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   /* validacni hlasky na formulari, nebo otevre modalni okno */
//   const handleBackendErrors = (errorResponse: ValidationError) => {
//     if (errorResponse.message && typeof errorResponse.message === "string") {
//       setErrorsMsg(`ErrorMsg.${ERROR_MESSAGES[errorResponse.message]}`);
//     }
//     const hasCustomErrors: boolean =
//       !!errorResponse.message && errorResponse.message.length > 0;
//     hasCustomErrors
//       ? setErrorsIntoForm(errorResponse)
//       : setGeneralErrorUpdateModalOpen(true);
//   };

//   const setErrorsIntoForm = (errorsFromBackend: ValidationError) => {
//     if (typeof errorsFromBackend.message !== "string") {
//       errorsFromBackend.message?.forEach((errorItem) => {
//         const [attribute] = errorItem.split(".");
//         const translatedErrorMessage = t(
//           cardUpdateMapErrorToTranslationKey(errorItem)
//         );
//         formRef.current?.setError(attribute as keyof CustomerFormData, {
//           type: "manual",
//           message: translatedErrorMessage,
//         });
//       });
//     }
//   };

//   // all su users
//   const { data: serviceUsersData } = useQuery<{ items: UserItem[] }>({
//     queryKey: ["serviceUsers", customerDetailData?.id],
//     queryFn: () =>
//       fetchUsersList({
//         filterAttributes: [
//           { name: "isActive", rule: FilterRulesEnum.IN, value: true },
//           { name: "systemRole", rule: FilterRulesEnum.IN, value: "su" },
//         ],
//       }),
//   });

//   // all ca users
//   const { data: customerAdminsData } = useQuery<{ items: UserItem[] }>({
//     queryKey: ["customerAdmins", customerDetailData?.id],
//     queryFn: () =>
//       fetchUsersList({
//         filterAttributes: [
//           { name: "isActive", rule: FilterRulesEnum.IN, value: true },
//           { name: "systemRole", rule: FilterRulesEnum.IN, value: "ca" },
//         ],
//       }),
//   });

//   return (
//     <div data-testid={`customer-${formMode}-form`}>
//       <ListHeading
//         title={
//           formMode === "create"
//             ? t("Customer.title_create")
//             : t("Customer.title_update")
//         }
//         // parentListUrl={'/admin/customers'}
//         inactive={customerDetailData ? !customerDetailData.isActive : false}
//         isEditMode
//         onSubmit={() => formRef.current?.submitForm()}
//         isSubmitting={isSubmitting}
//       />
//       <CustomerForm
//         formRef={formRef}
//         submit={handleSubmit}
//         customerDetailData={customerDetailData}
//         serviceUsersData={serviceUsersData?.items || []}
//         // customerAdminsData={customerAdminsData?.items || []}
//         setChangedUserIdList={setChangedUserIdList}
//       />
//       {isGeneralErrorUpdateModalOpen && (
//         <ModalDialogBasic
//           iconType={"warning"}
//           title={t("ErrorDataSaveFailed.errorDataSaveFailedTitle")}
//           description={t(errorsMsg)}
//           actions={[
//             {
//               label: t("General.toClose"),
//               onClick: () => {
//                 setErrorsMsg("");
//                 setGeneralErrorUpdateModalOpen(false);
//               },
//               isDefault: true,
//             },
//           ]}
//           open={isGeneralErrorUpdateModalOpen}
//           onClose={() => {
//             setErrorsMsg("");
//             setGeneralErrorUpdateModalOpen(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export const updateCustomer = async (
//   data: CustomerEditFormData & { warehouseId?: string; customerId?: string }
// ) => {
//   const url: string = data.customerId ? `update` : "create";
//   const accessToken = await getAccessToken();
//   if (!accessToken) {
//     return {
//       statusCode: 400,
//       message: ["You are not authorized to do this"],
//       error: "You are not authorized to do this",
//     };
//   }

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/customers/${url}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     if (!response.ok) {
//       const responseText: string = await response.text();
//       const responseData: ValidationError = JSON.parse(responseText);
//       console.error("API request failed with status:", response.status);
//       return responseData;
//     }

//     if (!data.customerId) {
//       const responseText: string = await response.text();
//       const responseData = JSON.parse(responseText);
//       return { id: responseData.id };
//     }

//     return null;
//   } catch (error) {
//     throw error;
//   }
// };
