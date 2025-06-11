import React, { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Stack,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { FTextField } from '../../../components/formik';
import { LoadingButton } from '@mui/lab';
import {
  createRolePermissionAdmin,
  getRolePermission,
  updateRolePermissionAdmin,
} from '../../../redux/thunks/rolePermissionThunk';
import { dispatch } from '../../../redux/store';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import { useParams } from 'react-router-dom';
import { getMenus } from '../../../redux/thunks/menuThunk';

interface Permission {
  id: string;
  label: string;
}

interface Menu {
  id: string;
  label: string;
  permissions: Array<{
    id: string;
    label: string;
  }>;
}

const FormSchema = Yup.object().shape({
  label: Yup.string().required(`Le champ est obligatoire.`),
  permissions: Yup.object().required()  // Remplacer privileges par permissions
});

export default function CreateNewEditRolePermissionPage() {
  const router = useRouter();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [activePermissions, setActivePermissions] = useState<Record<string, Record<string, boolean>>>({});

  const [initialValues, setInitialValues] = useState({
    label: '',
    permissions: {} as Record<string, string[]>  // Mettre à jour la structure avec permissions
  });

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res: any = await dispatch(getMenus());
        if (res?.payload?.data) {
          setMenus(res.payload.data);
        }
      } catch (error) {
        console.error('Erreur API getMenus:', error);
      }
    };
    fetchMenus();
  }, []);

  useEffect(() => {
    const fetchRolePermission = async () => {
      if (id) {
        const response = await dispatch(getRolePermission(id));
        const RolePermission = response?.payload?.data;

        if (RolePermission) {
          setInitialValues({
            label: RolePermission.label || '',
            permissions: RolePermission.permissions || {}
          });

          const initialPermissions: Record<string, Record<string, boolean>> = {};
          RolePermission.permissions?.forEach((permission: any) => {
            initialPermissions[permission.menuId] = permission.features.reduce(
              (acc: Record<string, boolean>, feature: string) => {
                acc[feature] = true;
                return acc;
              },
              {}
            );
          });
          setActivePermissions(initialPermissions);
        }
      }
    };

    fetchRolePermission();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      try {
        // Formater les permissions avant l'envoi
        const formattedPermissions = Object.keys(activePermissions).map((menuId) => {
          const selectedPermissions = Object.keys(activePermissions[menuId])
            .filter((featureId) => activePermissions[menuId][featureId])
            .map((featureId) => featureId);
        
          return selectedPermissions;  // Retourner un tableau de permissions sélectionnées pour chaque menu
        });

        const dataToSubmit = {
          ...values,
          permissions: formattedPermissions,  // Utiliser "permissions" au lieu de "privileges"
        };

        if (id) {
          await dispatch(updateRolePermissionAdmin({ id, dataForm: dataToSubmit }));
        } else {
          await dispatch(createRolePermissionAdmin(dataToSubmit));
        }
        router.push(PATH_DASHBOARD.rolePermissions);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { handleSubmit, setFieldValue, values, isSubmitting } = formik;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleTogglePermission = (menuId: string, permissionId: string) => {
    setActivePermissions((prev) => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        [permissionId]: !prev[menuId]?.[permissionId]  // Toggle the permission
      }
    }));
  };

  const currentMenu = menus[activeTab];

  return (
    <PageContainer menu={id ? "Modifier un rôle et permission" : "Ajouter un rôle et permission"}>
      <Card sx={{ p: 2 }}>
        <Box sx={{ margin: 'auto', width: { xs: '100%', md: '64%' }, pt: 2 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <FTextField name="label" label="Libellé" placeholder="libellé" />

              <Box mt={4}>
                <Typography variant="body2" sx={{ color: '#34b4e2', fontWeight: 'bold', mb: 2 }}>
                  Permissions
                </Typography>
                <Card sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  {/* Tabs pour naviguer entre les menus */}
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{ mb: 2 }}
                  >
                    {menus.map((menu) => (
                      <Tab key={menu.id} label={menu.label} />
                    ))}
                  </Tabs>

                  <Box>
                    {/* Afficher les permissions du menu actif */}
                    {currentMenu && (
                      <Stack direction="row" spacing={2} flexWrap="wrap">
                        {currentMenu.permissions?.map((permission) => (
                          <FormControlLabel
                            key={permission.id}
                            control={
                              <Checkbox
                                checked={activePermissions[currentMenu.id]?.[permission.id] || false}  // Vérifie l'état des permissions
                                onChange={() => handleTogglePermission(currentMenu.id, permission.id)}  // Gère le changement d'état
                              />
                            }
                            label={permission.label}
                          />
                        ))}
                      </Stack>
                    )}
                  </Box>
                </Card>
              </Box>

              <Stack my={4} direction="row" justifyContent="center" spacing={2} alignItems="center">
                <Button onClick={() => router.back()} size="large" color="inherit" variant="contained">
                  Annuler
                </Button>
                <LoadingButton loading={isSubmitting} variant="contained" type="submit" size="large" color="primary">
                  Enregistrer
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Card>
    </PageContainer>
  );
}
