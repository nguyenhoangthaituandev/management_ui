import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";
import DepartmentAPI from "../../api/DepartmentAPI";
import UserAPI from "../../api/UserAPI";
import DepartmentTableComponent from "../../components/departments/view_list/DepartmentTableComponent";
import DepartmentNoDataComponent from "../../components/departments/view_list/DepartmentNoDataComponent";
import { useNavigate } from "react-router-dom";
import CreateDepartmentModal from "../../components/departments/create/CreateDepartmentModal";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import UpdateDepartmentModal from "../../components/departments/update/UpdateDepartmentModal";
import DeleteDepartmentModal from "../../components/departments/delete/DeleteDepartmentModal";
import ImportAccountModal from "../../components/departments/import/ImportAccountModal";
import * as XLSX from 'xlsx';

const DepartmentPage = () => {

  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();


  const [departments, setDepartments] = useState([]);
  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //sorting
  const [currentSort, setCurrentSort] = useState({ sortField: "id", isASC: false });
  //search
  const [currentSearch, setCurrentSearch] = useState('');
  //filter
  const [currentFilter, setCurrentFilter] = useState({
    minCreatedDate: '',
    maxCreatedDate: '',
    minMemberSize: '',
    maxMemberSize: '',
  })
  //refresh table
  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());

  // create department
  const [isShowCreateDepartmentModal, setShowCreateDepartmentModal, setHideCreateDepartmentModal] = useBoolean(false);
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentSearchEmployee, setCurrentSearchEmployee] = useState('');
  const [currentSortEmployee, setCurrentSortEmployee] = useState({ sortField: "id", isASC: false });
  const [addingEmployeeIds, setAddingEmployeeIds] = useState(new Set());
  const [timeRefreshCreateForm, setTimeRefreshCreateForm] = useState(new Date());
  const [timeRefreshTableEmployee, setTimeRefreshTableEmployee] = useState(new Date());
  const [isShowEmployeeTable, setShowEmployeeTable, setHideEmployeeTable] = useBoolean(false);

  //update department
  const [isShowUpdateDepartmentModal, setShowUpdateDepartmentModal, setHideUpdateDepartmentModal] = useBoolean(false);
  const [managersForUpdate, setManagersForUpdate] = useState([]);
  const [detailDepartmentInfo, setDetailDepartmentInfo] = useState([]);
  const [timeRefreshUpdateForm, setTimeRefreshUpdateForm] = useState(new Date());

  // delete department
  const [isShowDeleteDepartmentModal, setShowDeleteDepartmentModal, setHideDeleteDepartmentModal] = useBoolean(false);
  const [deletingDepartmentID, setDeletingDepartmentID] = useState();

  // import account
  const [isShowImportAccountModal, setShowImportAccountModal, setHideImportAccountModal] = useBoolean(false);
  const [timeRefreshImportForm, setTimeRefreshImportForm] = useState(new Date());
  const [departmentsForImport, setDepartmentsForImport] = useState([]);
  const [accountsForImport, setAccountsForImport] = useState([]);
  const [isShowImportAccountTable, setShowImportAccountTable, setHideImportAccountTable] = useBoolean(false);

  useEffect(() => {
    getListDepartments();
  }, [currentPage, currentSort, currentSearch, currentFilter]);

  useEffect(() => {
    if (isShowCreateDepartmentModal) {
      getListEmployees();
    }

  }, [isShowCreateDepartmentModal, currentSearchEmployee, currentSortEmployee]);

  const getListDepartments = async () => {
    const response = await DepartmentAPI.getAll({
      page: currentPage,
      sortField: currentSort.sortField,
      isASC: currentSort.isASC,
      search: currentSearch,
      minCreatedDate: currentFilter.minCreatedDate,
      maxCreatedDate: currentFilter.maxCreatedDate,
      minMemberSize: currentFilter.minMemberSize,
      maxMemberSize: currentFilter.maxMemberSize,
    });
    setDepartments(response.content);
    setTotalPages(response.totalPages);
  }

  const resetPaging = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const resetCurrentSort = useCallback(() => {
    setCurrentSort({ sortField: 'id', isASC: false });
  }, []);

  const resetCurrentSearch = useCallback(() => {
    setCurrentSearch('');
  }, []);

  const resetCurrentFilter = useCallback(() => {
    setCurrentFilter({
      minCreatedDate: '',
      maxCreatedDate: '',
      minMemberSize: '',
      maxMemberSize: '',
    });
  }, []);

  const isSearchEmpty = () => {
    return !currentSearch || currentSearch.length === 0;
  }

  const isFilterEmpty = () => {
    return !currentFilter.minCreatedDate
      && !currentFilter.maxCreatedDate
      && !currentFilter.minMemberSize
      && !currentFilter.maxMemberSize;
  }

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    resetCurrentFilter();
    setTimeRefreshTable(new Date());
  }, []);

  const onClickDepartmentItem = useCallback((departmentID) => {
    navigate(`/departments/${departmentID}`);
  }, []);

  // create
  const onShowCreateDepartmentModal = () => {
    // reset modal
    setTimeRefreshCreateForm(new Date());
    //  get manager
    getListManagers();
    // hide employee table
    setHideEmployeeTable();
    // reset table employee
    onResetTableEmployee();
    // show modal
    setShowCreateDepartmentModal();
  }

  const existsByDepartmentName = useCallback(async (name) => {
    return await DepartmentAPI.existsByName(name);
  }, []);

  const getListManagers = async () => {
    const data = await UserAPI.getAllAccountsByNoDepartment();
    setManagers(data);
  }

  const getListEmployees = async () => {
    const data = await UserAPI.getAllAccountsByNoDepartment(
      currentSearchEmployee,
      currentSortEmployee.sortField,
      currentSortEmployee.isASC
    );
    setEmployees(data);
  }
  const onCreateDepartment = useCallback(async (name, managerId) => {
    // call api
    await DepartmentAPI.create(name, managerId, Array.from(addingEmployeeIds));
    // show notification
    showSuccessMessage("Create Department Successfully!");
    // hide modal
    setHideCreateDepartmentModal();
    // reset department table
    onResetTable();
  }, [addingEmployeeIds]);

  const isEmployeeSearchEmpty = () => {
    return !currentSearchEmployee || currentSearchEmployee.length === 0;
  }

  const resetCurrentSortEmployee = useCallback(() => {
    setCurrentSortEmployee({ sortField: 'updatedDateTime', isASC: false });
  }, []);

  const resetCurrentSearchEmployee = useCallback(() => {
    setCurrentSearchEmployee('');
  }, []);

  const onResetTableEmployee = useCallback(() => {
    resetCurrentSortEmployee();
    resetCurrentSearchEmployee();
    setTimeRefreshTableEmployee(new Date());
    setAddingEmployeeIds(new Set());
  }, []);

  // update
  const onShowUpdateDepartmentModal = async (departmentID) => {
    // reset modal
    setTimeRefreshUpdateForm(new Date());
    //  get manager
    await getListManagersForUpdate(departmentID);
    // get detail department
    await getDetailDepartmentInfo(departmentID);
    // show modal
    setShowUpdateDepartmentModal();
  }

  const getListManagersForUpdate = async (departmentID) => {
    const data = await DepartmentAPI.getAllAccountsByDepartment(departmentID);
    setManagersForUpdate(data.content);
  }

  const getDetailDepartmentInfo = async (departmentID) => {
    const data = await DepartmentAPI.getDetail(departmentID);
    setDetailDepartmentInfo(data);
  }

  const onUpdateDepartment = useCallback(async (departmentID, name, managerId) => {
    // call api
    await DepartmentAPI.update(departmentID, name, managerId);
    // show notification
    showSuccessMessage("Update Department Successfully!");
    // hide modal
    setHideUpdateDepartmentModal();
    // reset department table
    onResetTable();
  }, []);

  // delete
  const onShowDeleteDepartmentModal = useCallback((departmentID) => {
    //set true show modal
    setShowDeleteDepartmentModal();
    // save department id for delete
    setDeletingDepartmentID(departmentID);
  }, []);

  const onDeleteDepartment = useCallback(async () => {
    try {
      // call api
      await DepartmentAPI.delete(deletingDepartmentID);
      // show notification
      showSuccessMessage("Delete Department Successfully!");
      // hide modal
      setHideDeleteDepartmentModal();
      // reset department table
      onResetTable();
    } catch (error) {
      if (error.response.status === 400) {
        showErrorMessage("There are users in department. Can not delete this department!");
      } else {
        throw error;
      }
    }

  }, [deletingDepartmentID]);

  // import
  const onShowImportAccountModal = useCallback(async () => {
    //set true show modal
    setShowImportAccountModal();
    //  get list department
    await getDepartmentsForImport();
    // reset modal
    setAccountsForImport([]);
    setHideImportAccountTable();
    setTimeRefreshImportForm(new Date());
  }, []);

  const getDepartmentsForImport = async () => {
    const data = await DepartmentAPI.getAllDepartmentForFilter();
    setDepartmentsForImport(data);
  }

  const onChangeExcelFile = useCallback((event, file, setFieldError, setFieldValue) => {
    let reader = new FileReader();
    // read file
    reader.onload = function (e) {
      let workbook = XLSX.read(e.target.result, {
        type: 'binary'
      });
      // get first sheet
      let firstSheet = workbook.SheetNames[0];
      let rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
      let jsonArray = JSON.stringify(rows);
      jsonArray = JSON.parse(jsonArray);
      // format key
      renameOfAccountKeys(jsonArray);
      // get fullname & id
      getMoreAccountInfo(jsonArray, event, setFieldError, setFieldValue);
    };
    // error
    reader.onerror = function (exception) {
      console.log(exception);
    };
    reader.readAsBinaryString(file);
  }, []);

  const renameOfAccountKeys = (jsonArray) => {
    jsonArray.forEach((item) => {
      delete Object.assign(item, { username: item.Username })['Username'];
      delete Object.assign(item, { role: item.Role })['Role'];
    });
  }

  const getMoreAccountInfo = async (accounts, event, setFieldError, setFieldValue) => {
    try {
      const data = await UserAPI.getInfoAccountsByUsernames(accounts.map(account => account.username));
      for (const item of data) {
        let account = accounts.find(account => account.username == item.username)
        account.id = item.id;
        account.fullname = item.fullname;
      }
      setAccountsForImport(accounts);
      setShowImportAccountTable();
    } catch (error) {
      setAccountsForImport(accounts);
      setHideImportAccountTable();
      if (error.response.status === 400) {
        console.log(error);
        setFieldError("excelFile", JSON.stringify(error.response.data.exception));
        //reset
        setFieldValue("excelFile", "", false);
        event.target.value = null;
      } else {
        throw error;
      }
    }
  }

  const onImportAccounts = useCallback(async (departmentId, managerId, employeeIds) => {
    // call api
    await DepartmentAPI.importAccounts(departmentId, managerId, employeeIds);
    // show notification
    showSuccessMessage("Import Accounts Successfully!");
    // hide modal
    setHideImportAccountModal();
    // reset department table
    onResetTable();
  }, []);

  return (
    <>
      <Helmet title="Department" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">View list Departments</h1>
        {
          departments.length == 0 && isSearchEmpty() && isFilterEmpty()
            ? <DepartmentNoDataComponent />
            : <DepartmentTableComponent
              // table
              departments={departments}
              // paging
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              resetPaging={resetPaging}
              // sort
              currentSort={currentSort}
              setCurrentSort={setCurrentSort}
              resetCurrentSort={resetCurrentSort}
              // search
              currentSearch={currentSearch}
              setCurrentSearch={setCurrentSearch}
              // filter
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
              // refresh table
              onResetTable={onResetTable}
              timeRefreshTable={timeRefreshTable}
              // onClick
              onClickItem={onClickDepartmentItem}
              // onCreate
              onCreate={onShowCreateDepartmentModal}
              // onUpdate
              onUpdateItem={onShowUpdateDepartmentModal}
              // onDelete
              onDeleteItem={onShowDeleteDepartmentModal}
              // onImport
              onImport={onShowImportAccountModal}
            />
        }

        {isShowCreateDepartmentModal &&
          <CreateDepartmentModal
            isHideModal={setHideCreateDepartmentModal}
            existsByName={existsByDepartmentName}
            managers={managers}
            isShowTable={isShowEmployeeTable}
            setShowTable={setShowEmployeeTable}
            employees={employees}
            // sort
            currentSort={currentSortEmployee}
            setCurrentSort={setCurrentSortEmployee}
            resetCurrentSort={resetCurrentSortEmployee}
            // search
            currentSearch={currentSearchEmployee}
            setCurrentSearch={setCurrentSearchEmployee}
            isSearchEmpty={isEmployeeSearchEmpty}
            // refresh table
            onResetTable={onResetTableEmployee}
            timeRefreshTable={timeRefreshTableEmployee}
            //checkbox
            addingIds={addingEmployeeIds}
            setAddingIds={setAddingEmployeeIds}
            timeRefreshCreateForm={timeRefreshCreateForm}
            onSubmit={onCreateDepartment}
          />
        }

        {isShowUpdateDepartmentModal &&
          <UpdateDepartmentModal
            isHideModal={setHideUpdateDepartmentModal}
            existsByName={existsByDepartmentName}
            managers={managersForUpdate}
            timeRefreshUpdateForm={timeRefreshUpdateForm}
            detailInfo={detailDepartmentInfo}
            onSubmit={onUpdateDepartment}
          />
        }

        {isShowDeleteDepartmentModal &&
          <DeleteDepartmentModal
            isHideModal={setHideDeleteDepartmentModal}
            departmentName={departments.find(department => department.id === deletingDepartmentID).name}
            onSubmit={onDeleteDepartment}
          />
        }

        {isShowImportAccountModal &&
          <ImportAccountModal
            isHideModal={setHideImportAccountModal}
            departments={departmentsForImport}
            accounts={accountsForImport}
            isShowTable={isShowImportAccountTable}
            timeRefreshImportForm={timeRefreshImportForm}
            onChangeExcelFile={onChangeExcelFile}
            onSubmit={onImportAccounts}
          />
        }
      </Container>
    </>
  );
};

export default DepartmentPage;
