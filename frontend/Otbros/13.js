/**
 * Created by Hel on 14.09.2015. 7777
 */

//populateSubjectList - няшка из state.resolve, с вытащенным перед загрузкой контроллера списком предметов
egeApp.controller("AdminSubjectEditController", function (AdminLoginService, $rootScope, $scope, AdminSubjectsEditService, populateSubjectList, $modal, $timeout) {

  //$rootScope.isAdminAuthorized = AdminLoginService.isAdminAuthorized(); логин выпилен

  //Загрузить список предметов из инжектированного параметра
  $scope.SubjectList = populateSubjectList;

  //Исчезающий алерт, милая добрая магия
  $scope.AnimateAlertFading = function (thereWasNoError) {
    var fadeInterval;
    if (thereWasNoError)
      fadeInterval = 5000;
    else
      fadeInterval = 15000; //сообщения об ошибке светятся дольше

    $timeout(function (fadeInterval) {
      //нажмите и  удерживайте
      $scope.doFade = true;
    }, fadeInterval);
    $scope.doFade = false;
  }

  //*****************************УДАЛИТЬ***************************************
  $scope.DeleteSubject = function (subject) {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'admin/SubjectEdit/Modal.html',
      controller: 'ModalController',
      //size: size,
      resolve: {
        DataToPassInModal: function () {
          var mydatus = {
            action: "Удаление",
            name: subject.name,
            code: subject.code
          };
          return mydatus
        }
      }
    });

    modalInstance.result.then(function (deletedSubjectFromModal) {

      AdminSubjectsEditService.deleteSubject(deletedSubjectFromModal)
        .then(function (data) {
          if (data == undefined) {
            $scope.serverError = false;
            $scope.serverMessage = "Предмет удален. Код предмета: " + deletedSubjectFromModal.code + ". Имя предмета: " + deletedSubjectFromModal.name;
            //обновим вьюшечку
            AdminSubjectsEditService.getAllSubjects()
              .then(function (data) {
                $scope.SubjectList = data.plain();
              }, function (error) {
                $scope.serverMessage = $scope.serverMessage + ". Не удалось обновить список предметов после удаления"
              });
          }
          else //ошибка: не сработал GET
          {
            $scope.serverError = true;
            $scope.serverMessage = "Невозможно получить предмет для удаления. Статус: " + data.status + ". Ошибка: " + data.statusText;
          }
        },
        function (errorPut) { //ошибка: не сработал PUT
          $scope.serverError = true;
          $scope.serverMessage = "Невозможно удалить предмет. Статус: " + errorPut.status + ". Ошибка: " + errorPut.statusText;
        })

      //Запуск анимации алерта
      $scope.AnimateAlertFading($scope.serverError);

    })

  }

  //*****************************РЕДАКТИРОВАТЬ***************************************
  $scope.EditSubject = function (subject) {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'admin/SubjectEdit/Modal.html',
      controller: 'ModalController',
      //size: size,
      resolve: {
        DataToPassInModal: function () {
          var mydatus = {
            action: "Редактирование",
            name: subject.name,
            code: subject.code
          };
          return mydatus
        }
      }
    });

    modalInstance.result.then(function (editedSubjectFromModal) {

      AdminSubjectsEditService.editSubject(editedSubjectFromModal)
        .then(function (data) {
          if (data == undefined) {
            $scope.serverError = false;
            $scope.serverMessage = "Изменения сохранены. Код предмета: " + editedSubjectFromModal.code + ". Новое имя предмета: " + editedSubjectFromModal.name;
            //обновим вьюшечку
            subject.name = editedSubjectFromModal.name;
          }
          else //ошибка: не сработал GET
          {
            $scope.serverError = true;
            $scope.serverMessage = "Невозможно получить предмет для редактировния. Статус: " + data.status + ". Ошибка: " + data.statusText;
          }
        },
        function (errorPut) { //ошибка: не сработал PUT
          $scope.serverError = true;
          $scope.serverMessage = "Невозможно сохранить предмет. Статус: " + errorPut.status + ". Ошибка: " + errorPut.statusText;
        })

      //Запуск анимации алерта
      $scope.AnimateAlertFading($scope.serverError);

    })
  };

  //*****************************ДОБАВИТЬ***************************************
  $scope.AddNewSubject = function () {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'admin/SubjectEdit/Modal.html',
      controller: 'ModalController',
      //size: size,
      resolve: {
        DataToPassInModal: function () {
          var mydatus = {
            action: "Добавление"
          };
          return mydatus
        }
      }
    });

    modalInstance.result.then(function (newSubjectFromModal) {

      AdminSubjectsEditService.addNewSubject(newSubjectFromModal)
        .then(function (data) {
          $scope.serverError = false;
          $scope.serverMessage = "Новый предмет сохранен. Код предмета: " + newSubjectFromModal.code + ". Имя предмета: " + newSubjectFromModal.name;

          //обновим вьюшечку
          AdminSubjectsEditService.getAllSubjects()
            .then(function (data) {
              $scope.SubjectList = data.plain();
            }, function (error) {
              $scope.serverMessage = $scope.serverMessage + ". Не удалось обновить список предметов после добавления нового"
            });
        },
        function (errorPOST) { //ошибка: не сработал POST
          console.log(errorPOST);
          $scope.serverError = true;
          if (errorPOST != undefined && errorPOST.status == 409)
            $scope.serverMessage = "Невозможно сохранить предмет. Предмет с таким кодом уже существует";
          else
            $scope.serverMessage = "Невозможно сохранить предмет. Статус: " + errorPOST.status + ". Ошибка: " + errorPOST.statusText;
        })

      //Запуск анимации алерта
      $scope.AnimateAlertFading($scope.serverError);

    });

  }

})
